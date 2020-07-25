function toData(model) {
    if (!model) {
        return {};
    }
    return {
        productCode: model.productCode,
        userId: model.userId,
        comment: model.comment,
        stars: model.stars,
        createdAt: new Date(model.createdAt),
    };
}

function toDataAll(all) {
    if (!all) {
        return [];
    }
    return all.map(model => toData(model));
}

module.exports = {
    toData,
    toDataAll,
}