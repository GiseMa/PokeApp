export const allTheEvolutions = (chain) => {
    const names = [];
    const traverse = (node) => {
        names.push(node.species.name);
        node.evolves_to.forEach(traverse);
    };
    traverse(chain);
    return names;
};

export const getEvolutionsAndInvolutions = (evolutionNames, pokemonName) => {
    const i = evolutionNames.indexOf(pokemonName);
    return {
        evolutionsOnly: evolutionNames.slice(i + 1),
        involutionsOnly: evolutionNames.slice(0, i),
    };
};
