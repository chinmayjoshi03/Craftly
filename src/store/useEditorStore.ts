import { create } from 'zustand';

export type ElementType = 'Button' | 'Text' | 'Image' | 'Input' | 'Card' | 'Icon' | 'Container' | 'Switch';

export interface ElementStyle {
    width: number;
    height: number;
    x: number;
    y: number;
    backgroundColor?: string;
    borderRadius?: number;
    fontSize?: number;
    color?: string;
    padding?: number;
    borderWidth?: number;
    borderColor?: string;
    iconName?: string;
    isOn?: boolean;
    imageUrl?: string;
}

export interface CanvasElement {
    id: string;
    type: ElementType;
    style: ElementStyle;
    content?: string;
}

interface EditorState {
    elements: CanvasElement[];
    selectedId: string | null;

    // Actions
    addElement: (type: ElementType) => void;
    updateElement: (id: string, updates: Partial<CanvasElement>) => void;
    updateElementStyle: (id: string, styleUpdates: Partial<ElementStyle>) => void;
    deleteElement: (id: string) => void;
    selectElement: (id: string | null) => void;
    getSelectedElement: () => CanvasElement | undefined;
}

const defaultStyles: Record<ElementType, ElementStyle> = {
    Button: {
        width: 180,
        height: 48,
        x: 80,
        y: 100,
        backgroundColor: '#6366f1',
        borderRadius: 12,
        fontSize: 16,
        color: '#ffffff',
        padding: 12,
    },
    Text: {
        width: 200,
        height: 40,
        x: 80,
        y: 100,
        backgroundColor: 'transparent',
        fontSize: 18,
        color: '#1a1a1a',
    },
    Image: {
        width: 150,
        height: 150,
        x: 80,
        y: 100,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        imageUrl: '',
    },
    Input: {
        width: 280,
        height: 48,
        x: 30,
        y: 100,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        fontSize: 16,
        color: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#d1d5db',
        padding: 12,
    },
    Card: {
        width: 300,
        height: 180,
        x: 20,
        y: 100,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 0,
        borderColor: 'transparent',
    },
    Icon: {
        width: 48,
        height: 48,
        x: 80,
        y: 100,
        backgroundColor: 'transparent',
        fontSize: 32,
        color: '#6366f1',
        iconName: 'star',
    },
    Container: {
        width: 320,
        height: 120,
        x: 10,
        y: 100,
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    Switch: {
        width: 52,
        height: 32,
        x: 80,
        y: 100,
        backgroundColor: '#6366f1',
        borderRadius: 16,
        isOn: true,
    },
};

const defaultContent: Record<ElementType, string> = {
    Button: 'Button',
    Text: 'Text Label',
    Image: '',
    Input: 'Enter text...',
    Card: 'Card Title',
    Icon: '⭐',
    Container: '',
    Switch: '',
};

let elementCounter = 0;

export const useEditorStore = create<EditorState>((set, get) => ({
    elements: [],
    selectedId: null,

    addElement: (type: ElementType) => {
        const id = `${type.toLowerCase()}_${++elementCounter}`;
        const newElement: CanvasElement = {
            id,
            type,
            style: { ...defaultStyles[type] },
            content: defaultContent[type],
        };

        set((state) => ({
            elements: [...state.elements, newElement],
            selectedId: id,
        }));
    },

    updateElement: (id: string, updates: Partial<CanvasElement>) => {
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, ...updates } : el
            ),
        }));
    },

    updateElementStyle: (id: string, styleUpdates: Partial<ElementStyle>) => {
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, style: { ...el.style, ...styleUpdates } } : el
            ),
        }));
    },

    deleteElement: (id: string) => {
        set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
        }));
    },

    selectElement: (id: string | null) => {
        set({ selectedId: id });
    },

    getSelectedElement: () => {
        const state = get();
        return state.elements.find((el) => el.id === state.selectedId);
    },
}));
