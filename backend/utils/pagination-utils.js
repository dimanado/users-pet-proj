const { defaultPage, defaultLimit } = require('../config/pagination-config');

function getPaginationParams(query) {
    let { page, limit } = query;
    page = page ? Number(page) : defaultPage;
    limit = limit ? Number(limit) : defaultLimit;

    const offset = (page - 1) * limit;

    return { page, limit, offset };
}

module.exports = getPaginationParams;