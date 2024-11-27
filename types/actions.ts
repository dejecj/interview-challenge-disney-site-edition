type ObjectType = "character";

interface ISuccessResponse<D,P> {
    success: true;
    object: ObjectType;
    data: D;
    pagination: P
}

interface IErrorResponse<E> {
    success: false;
    object: ObjectType;
    error: E;
}

type IResponse<D, P, E> = ISuccessResponse<D,P> | IErrorResponse<E>;

export class Response<D, P, E> {
    success: boolean;
    object: ObjectType;
    data: D;
    pagination: P;
    error: E;

    constructor(
        object: ObjectType,
        data?: D,
        pagination?: P,
        error?: E,
    ) {
        this.object = object;
        if (error) {
            this.success = false;
            this.error = error;
            this.data = undefined as D;
            this.pagination = undefined as P;
        } else {
            this.success = true;
            this.data = data as D;
            this.error = undefined as E;
            this.pagination = pagination as P
        }
    }

    toJSON(): IResponse<D, P, E> {
        if (this.success) {
            return {
                success: true,
                object: this.object,
                data: this.data as D,
                pagination: this.pagination as P
            };
        } else {
            return {
                success: false,
                object: this.object,
                error: this.error as E
            };
        }
    }
}