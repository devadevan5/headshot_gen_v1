import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryThumbnailGrid = ({ title, categories, selectedItem, onItemSelect, type }) => {
  const [activeCategory, setActiveCategory] = useState(categories?.[0]?.name || '');

  const activeItems = categories?.find(cat => cat?.name === activeCategory)?.items || [];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {categories?.map((category) => (
            <button
              key={category?.name}
              onClick={() => setActiveCategory(category?.name)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeCategory === category?.name
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {activeItems?.map((item) => (
            <div
              key={item?.id}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => onItemSelect(item)}
            >
              <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                selectedItem?.id === item?.id
                  ? 'border-accent shadow-lg scale-105'
                  : 'border-border group-hover:border-accent/50 group-hover:scale-102'
              }`}>
                <Image
                  src={item?.thumbnail}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
                
                {selectedItem?.id === item?.id && (
                  <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  </div>
                )}
                
                {item?.isNew && (
                  <div className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                    New
                  </div>
                )}
              </div>
              
              <p className="text-xs text-center text-muted-foreground mt-2 truncate w-20 sm:w-24">
                {item?.name}
              </p>
            </div>
          ))}
        </div>
        
        {activeItems?.length > 4 && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default CategoryThumbnailGrid;