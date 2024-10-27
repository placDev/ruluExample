export class Response<T> {
    constructor(value: Partial<Response<T>>) {
        this.success = value?.success ?? false;
        this.result = value?.result ?? {} as T;
    }

    success: boolean;
    result: T;

    static success<B>(result: B) {
        return new Response<B>({
            success: true,
            result: result
        })
    }

    static error<B>(result: B) {
        return new Response<B>({
            success: false,
            result: result
        })
    }
}