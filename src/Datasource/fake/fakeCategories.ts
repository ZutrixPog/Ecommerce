
const tagToCat = {
    1: 'general',
    2: 'funny',
    3: 'science'
}

const catToTag = {
    'general': 1,
    'funny': 2,
    'science': 3,
}

export default {
    tagToCategory: async (id: any) => {
        return tagToCat[id as keyof typeof tagToCat];
    },

    categoryToTag: async (name: string) => {
        return catToTag[name as keyof typeof catToTag];
    }
}