import React, { useState, useMemo } from 'react';
import { Search, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';
import { complianceRequirements, feeStructure } from '../../data/scriptContent';

export const Glossary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Terms', count: 0 },
    { id: 'compliance', name: 'Compliance', count: complianceRequirements.length },
    { id: 'legal', name: 'Legal Terms', count: 8 },
    { id: 'process', name: 'Process Terms', count: 12 },
    { id: 'fees', name: 'Fee Structure', count: Object.keys(feeStructure).length }
  ];

  const legalTerms = [
    {
      term: 'FCRA (Fair Credit Reporting Act)',
      definition: 'Federal law that regulates the collection, dissemination, and use of consumer credit information.',
      context: 'Required authorization before pulling credit reports',
      importance: 'critical'
    },
    {
      term: 'TCPA (Telephone Consumer Protection Act)',
      definition: 'Federal law that restricts telemarketing calls and the use of automated telephone equipment.',
      context: 'Requires "opt out" language in call openings',
      importance: 'critical'
    },
    {
      term: 'Soft Inquiry',
      definition: 'A credit check that does not affect the consumer\'s credit score.',
      context: 'Used when pulling credit reports for analysis',
      importance: 'high'
    },
    {
      term: 'Debt Settlement',
      definition: 'A program where creditors agree to accept less than the full amount owed to settle a debt.',
      context: 'The primary service offered to clients',
      importance: 'critical'
    },
    {
      term: 'Credit Utilization',
      definition: 'The percentage of available credit that a consumer is using.',
      context: '30% of credit score calculation',
      importance: 'high'
    },
    {
      term: 'Hardship Program',
      definition: 'A program designed to help consumers facing financial difficulties.',
      context: 'Legal basis for debt settlement programs',
      importance: 'high'
    },
    {
      term: 'FDIC Insured',
      definition: 'Deposits are protected by the Federal Deposit Insurance Corporation.',
      context: 'Settlement accounts are FDIC insured',
      importance: 'medium'
    },
    {
      term: 'Verbatim Language',
      definition: 'Exact words that must be used without any changes or modifications.',
      context: 'Compliance requirements for legal disclosures',
      importance: 'critical'
    }
  ];

  const processTerms = [
    {
      term: 'Discovery Phase',
      definition: 'Initial questioning to understand client\'s financial situation and goals.',
      context: 'First major section of the call script',
      importance: 'high'
    },
    {
      term: 'Credit Analysis',
      definition: 'Review of client\'s credit report to identify issues and opportunities.',
      context: 'After credit pull authorization',
      importance: 'high'
    },
    {
      term: '5 Options Framework',
      definition: 'Strategic presentation of debt resolution options to guide client to settlement.',
      context: 'Core sales strategy section',
      importance: 'critical'
    },
    {
      term: 'Process of Elimination',
      definition: 'Sales technique of disqualifying other options to lead client to desired choice.',
      context: 'Used in 5 Options presentation',
      importance: 'high'
    },
    {
      term: 'Pre-Approval',
      definition: 'Underwriting process to qualify client for the program.',
      context: 'Before enrollment and DocuSign',
      importance: 'high'
    },
    {
      term: 'DocuSign',
      definition: 'Electronic signature platform for enrollment agreements.',
      context: 'Final step of enrollment process',
      importance: 'medium'
    },
    {
      term: 'Settlement Account',
      definition: 'Dedicated account where client payments accumulate for creditor settlements.',
      context: 'FDIC insured account owned by client',
      importance: 'high'
    },
    {
      term: 'Legal Protection Services',
      definition: 'Additional service providing legal representation if needed.',
      context: 'Optional add-on service',
      importance: 'medium'
    },
    {
      term: 'Co-Client',
      definition: 'Additional person in household with unsecured debt.',
      context: 'Requires separate credit pull and authorization',
      importance: 'medium'
    },
    {
      term: 'Verbal Authorization',
      definition: 'Spoken consent required for certain actions like credit pulls.',
      context: 'Must obtain clear "YES" response',
      importance: 'critical'
    },
    {
      term: 'Identity Verification',
      definition: 'Process of confirming client\'s identity and banking information.',
      context: 'Required for program enrollment',
      importance: 'high'
    },
    {
      term: 'Recap Script',
      definition: 'Verbatim summary of program terms before enrollment.',
      context: 'Final compliance step before DocuSign',
      importance: 'critical'
    }
  ];

  const allTerms = [
    ...complianceRequirements.map(req => ({
      term: req.phrase,
      definition: req.legal,
      context: req.context,
      importance: 'critical' as const,
      category: 'compliance'
    })),
    ...legalTerms.map(term => ({ ...term, category: 'legal' })),
    ...processTerms.map(term => ({ ...term, category: 'process' })),
    ...Object.entries(feeStructure).map(([state, fee]) => ({
      term: `${state} Fee Rate`,
      definition: `${fee}% of total enrolled debt amount`,
      context: 'Program fee structure by state',
      importance: 'high' as const,
      category: 'fees'
    }))
  ];

  const filteredTerms = useMemo(() => {
    let filtered = allTerms;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.context.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [allTerms, selectedCategory, searchQuery]);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Glossary</h1>
            <p className="text-gray-600">Quick reference for all terms, compliance requirements, and legal language</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms, definitions, or context..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} {category.count > 0 && `(${category.count})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compliance Alert */}
      <div className="bg-compliance-yellow border-2 border-compliance-red rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-compliance-red mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-compliance-red mb-1">
              Critical Compliance Terms
            </h4>
            <p className="text-sm text-compliance-red">
              Terms marked as "Critical" must be used exactly as written. Any deviation 
              could result in legal violations and compliance issues.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTerms.map((term, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{term.term}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getImportanceColor(term.importance)}`}>
                {term.importance}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Definition</h4>
                <p className="text-gray-600">{term.definition}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Context</h4>
                <p className="text-gray-600">{term.context}</p>
              </div>

              {term.importance === 'critical' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">
                      Must be used exactly as written
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No terms found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Compliance Requirements</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• "calling on a recorded line"</li>
              <li>• "You can opt out at any time"</li>
              <li>• FCRA authorization</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Fee Structure</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Missouri/Iowa: 18%</li>
              <li>• Idaho: 28%</li>
              <li>• All other states: 25%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Key Processes</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Discovery → Authorization</li>
              <li>• Credit Analysis → 5 Options</li>
              <li>• Program Explanation → Closing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
