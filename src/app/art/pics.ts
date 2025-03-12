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
        description: "A cybernetic Gucci dripped monk. The epitome of juxtaposition between detachment from wordly desires and hyper luxury materialism.",
        dateCreated: '2025-01-27',
        model: 'Fooocus'
    }
]