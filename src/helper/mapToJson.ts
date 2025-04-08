const mapToJSON = (value: any) => value.map(item => item.toJSON())

export default mapToJSON;

/**
 * Middleware that adds a delay to all routes
 * @param {number} ms - Delay in milliseconds
 * @returns {Function} Express middleware function
 */
export const addDelay = (ms = 1000) => {
    return (req, res, next) => {
        setTimeout(next, ms);
    };
}