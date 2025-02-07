function mergeAndMap(obj1, obj2, mapping = {}) {
    let merged = { ...obj1, ...obj2 };

    // Apply mapping
    Object.keys(mapping).forEach((oldKey) => {
        if (merged.hasOwnProperty(oldKey)) {
            const newKey = mapping[oldKey];
            merged[newKey] = merged[oldKey];
            delete merged[oldKey]; // Remove old key
        }
    });

    return merged;
}