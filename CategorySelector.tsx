import React from 'react';
import { Category } from '../types';
import { BookOpen, PenTool, Calculator } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const categories: { type: Category; icon: React.ReactNode; label: string }[] = [
    { type: 'Reading', icon: <BookOpen className="w-6 h-6" />, label: 'Reading' },
    { type: 'Writing', icon: <PenTool className="w-6 h-6" />, label: 'Writing' },
    { type: 'Math', icon: <Calculator className="w-6 h-6" />, label: 'Math' },
  ];

  return (
    <div className="flex gap-4 mb-8">
      {categories.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => onSelectCategory(type)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === type
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}