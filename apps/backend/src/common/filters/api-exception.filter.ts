import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiFailure, ErrorCode } from '@sama-shop/common';
import { Request, Response } from 'express';

const HTTP_ERROR_CODE_MAP: Record<number, ErrorCode | undefined> = {
  [HttpStatus.BAD_REQUEST]: ErrorCode.VALIDATION_ERROR,
  [HttpStatus.UNPROCESSABLE_ENTITY]: ErrorCode.VALIDATION_ERROR,
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const raw = isHttp ? exception.getResponse() : null;

    const { message, details } = this.extractMessageAndDetails(raw, exception);

    const code = this.mapToErrorCode(status);

    const body: ApiFailure = {
      success: false,
      error: {
        code,
        message,
        details: {
          ...details,
          path: req.url,
          method: req.method,
          timestamp: Date.now(),
        },
      },
    };

    res.status(status).json(body);
  }

  private extractMessageAndDetails(
    raw: unknown,
    exception: unknown,
  ): {
    message: string;
    details?: Record<string, unknown>;
  } {
    if (raw && typeof raw === 'object') {
      const rawObj = raw as Record<string, unknown>;

      if (Array.isArray(rawObj.message)) {
        return {
          message: 'Validation failed',
          details: { validationErrors: rawObj.message },
        };
      }

      if (typeof rawObj.message === 'string') {
        return { message: rawObj.message };
      }
    }

    if (exception instanceof Error && exception.message) {
      return { message: exception.message };
    }

    return { message: 'Internal server error' };
  }

  private mapToErrorCode(status: number) {
    return HTTP_ERROR_CODE_MAP[status] ?? ErrorCode.INTERNAL_SERVER_ERROR;
  }
}
