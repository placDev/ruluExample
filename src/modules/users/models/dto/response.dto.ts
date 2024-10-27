export class Response<T = any> {
    constructor(value: Partial<Response<T>>) {
        this.success = value?.success ?? false;
        this.result = value?.result;
    }

    success: boolean;
    result: T;

    static success<B>(result?: B) {
        if(!result) {
            new Response<B>({
                success: true,
                result: result
            })
        }

        return new Response<B>({
            success: true,
            result: result
        })
    }

    static error(error: string) {
        return new Response({
            success: false,
            result: {
                error
            }
        })
    }
}