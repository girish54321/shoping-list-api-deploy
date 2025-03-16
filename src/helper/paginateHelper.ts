const paginateHelper = ({ currentPage, pageSize }) => {
    const limit = pageSize;
    const offset = (currentPage - 1) * pageSize;

    return {
        limit,
        offset,
    };
};
export default paginateHelper;
