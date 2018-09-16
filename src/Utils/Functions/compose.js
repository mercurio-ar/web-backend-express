// compose :: [(y -> z), (x -> y), (w -> x), ..., (a -> b)] -> (a -> z)
export function compose(fs) {
    return (...args) => fs.reduce(
        (acc, f) => f(acc),
        ...args
    );
}
