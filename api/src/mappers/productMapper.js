
function toData({code, userId, price, name, medias, description}) {
    const data = {
        code: code,
        price: price,
        name: name,
        medias: medias,
        userId: userId,
        description: description
    };
    return data;
}

function toDataAll(all) {
    return all.map(model => toData(model));
}

module.exports = {
    toData,
    toDataAll,
}