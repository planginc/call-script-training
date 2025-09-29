import { useMemo } from 'react';
import { scriptContent, complianceRequirements } from '../data/scriptContent';

export const useSearch = (query: string) => {
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const results: any[] = [];
    const searchTerm = query.toLowerCase();

    // Search through script content
    scriptContent.forEach(module => {
      module.subsections.forEach(subsection => {
        subsection.content.forEach((block, blockIndex) => {
          if (block.content.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'script',
              module: module.title,
              subsection: subsection.title,
              content: block.content,
              blockType: block.type,
              moduleId: module.id,
              subsectionId: module.subsections.findIndex(sub => sub.id === subsection.id),
              blockIndex
            });
          }
        });
      });
    });

    // Search through compliance requirements
    complianceRequirements.forEach(req => {
      if (
        req.phrase.toLowerCase().includes(searchTerm) ||
        req.context.toLowerCase().includes(searchTerm) ||
        req.legal.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'compliance',
          phrase: req.phrase,
          context: req.context,
          legal: req.legal,
          id: req.id
        });
      }
    });

    return results;
  }, [query]);

  return { searchResults };
};
