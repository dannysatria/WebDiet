const camelCaseToLowerCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeEachWord = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export { capitalizeFirstLetter, camelCaseToLowerCase, capitalizeEachWord}