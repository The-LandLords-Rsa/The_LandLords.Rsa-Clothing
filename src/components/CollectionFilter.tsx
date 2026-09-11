import React from 'react';
import { CollectionId, CategoryId } from '../types';
import { COLLECTIONS_LIST, CATEGORIES_LIST } from '../data/products';
import { Search, X } from 'lucide-react';

interface CollectionFilterProps {
  selectedCollection: CollectionId;
  onSelectCollection: (id: CollectionId) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export const CollectionFilter: React.FC<CollectionFilterProps> = ({
  selectedCollection,
  onSelectCollection,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}) => {
  return (
    <div id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      {/* Header title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-2">
            The LandLords Catalogue
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-neutral-50">
            Garment Drops & Capsules
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="product-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search piece, fabric, color..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-9 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Collection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-neutral-800/80">
        {COLLECTIONS_LIST.map((col) => {
          const isActive = selectedCollection === col.id;
          return (
            <button
              key={col.id}
              id={`filter-collection-${col.id}`}
              onClick={() => onSelectCollection(col.id as CollectionId)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-neutral-100 text-neutral-950 shadow-md font-bold'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850 border border-neutral-800'
              }`}
            >
              <span>{col.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {col.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Garment Category Tabs & Active status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => onSelectCategory(cat.id as CategoryId)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                    : 'bg-transparent text-neutral-400 hover:text-neutral-300 border border-transparent hover:border-neutral-800'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-neutral-400 tracking-wider uppercase">
          Showing <span className="text-amber-400 font-bold">{totalResults}</span> pieces
        </div>
      </div>
    </div>
  );
};
