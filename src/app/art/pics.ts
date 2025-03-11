export interface ArtPiece {
    src: string;
    title: string;
    description?: string;
    dateCreated?: string;
    model?: string;
}

export const pics: ArtPiece[] = [
    { 
        src: '/gucci-monk.png', 
        title: 'Gucci Monk',
        description: 'A monk in meditation wearing Gucci-inspired attire, balancing spirituality with luxury.',
        dateCreated: '2025-01-27',
        model: 'Fooocus'
    }
]