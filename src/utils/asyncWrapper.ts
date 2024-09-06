function asyncWrapper<T>(promise: Promise<T>): Promise<[T | undefined, Error | undefined]> {
    return promise
        .then((data: T) => [data, undefined] as [T, undefined])
        .catch((error: Error) => [undefined, error] as [undefined, Error]);
}
export default asyncWrapper;
