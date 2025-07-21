'use client'

interface DebugProps {
    data: any;
    label: string;
}

export function Debug({ data, label }: DebugProps) {
    // Este vai aparecer no console do navegador
    console.log(`${label}:`, data);
    
    return null; // Não renderiza nada visualmente
}
