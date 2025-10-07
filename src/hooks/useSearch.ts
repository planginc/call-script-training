import { useMemo } from 'react';
import { scriptContent, complianceRequirements } from '../data/scriptContent';
import { salesManualSections } from '../data/salesManualContent';

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

    // Search through sales manual content
    salesManualSections.forEach(section => {
      if (
        section.title.toLowerCase().includes(searchTerm) ||
        section.description.toLowerCase().includes(searchTerm) ||
        section.content.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'sales-manual',
          section: section.title,
          description: section.description,
          content: section.content,
          sectionId: section.id,
          sectionNumber: section.section
        });
      }
    });

    return results;
  }, [query]);

  return { searchResults };
};
