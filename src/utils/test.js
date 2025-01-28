function reorderByPrimaryFacility(array) {
    return array.sort((a, b) => (b.primaryFacility === "Y") - (a.primaryFacility === "Y"));
}