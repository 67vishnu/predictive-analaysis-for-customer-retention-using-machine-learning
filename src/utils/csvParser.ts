
/**
 * Utility to parse CSV files for analytics data
 */

export interface AnalyticsDataPoint {
  name: string;
  value: number;
  predicted?: number;
}

export interface CategoryDataPoint {
  name: string;
  current: number;
  previous: number;
}

export interface DemographicsDataPoint {
  name: string;
  value: number;
}

export interface ChurnRiskDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface ParsedAnalyticsData {
  monthlyData?: AnalyticsDataPoint[];
  quarterlyData?: AnalyticsDataPoint[];
  categoryData?: CategoryDataPoint[];
  demographicsData?: DemographicsDataPoint[];
  churnRiskData?: ChurnRiskDataPoint[];
}

/**
 * Parse CSV content and map it to analytics data structure
 */
export const parseAnalyticsCSV = (content: string): ParsedAnalyticsData => {
  try {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Determine the type of data based on headers
    if (headers.includes('month') || headers.includes('Month') || headers.includes('name')) {
      // Process monthly/quarterly data
      return processTimeSeriesData(lines, headers);
    } else if (headers.includes('category') || headers.includes('Category')) {
      // Process category data
      return processCategoryData(lines, headers);
    } else if (headers.includes('demographic') || headers.includes('Demographic') || headers.includes('age') || headers.includes('Age')) {
      // Process demographics data
      return processDemographicsData(lines, headers);
    } else if (headers.includes('risk') || headers.includes('Risk')) {
      // Process churn risk data
      return processChurnRiskData(lines, headers);
    }
    
    // Default fallback - try to determine based on data structure
    return inferAndProcessData(lines, headers);
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return {};
  }
};

/**
 * Process time series data like monthly or quarterly values
 */
const processTimeSeriesData = (lines: string[], headers: string[]): ParsedAnalyticsData => {
  const nameIndex = getHeaderIndex(headers, ['name', 'month', 'quarter', 'period']);
  const valueIndex = getHeaderIndex(headers, ['value', 'actual']);
  const predictedIndex = getHeaderIndex(headers, ['predicted', 'forecast']);
  
  if (nameIndex === -1 || valueIndex === -1) return {};
  
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(val => val.trim());
      
      // Check if this is likely quarterly data
      const isQuarterly = values[nameIndex].includes('Q') || 
                          values[nameIndex].length <= 2; // Assumes Q1, Q2, etc.
      
      return {
        name: values[nameIndex],
        value: parseFloat(values[valueIndex]),
        ...(predictedIndex !== -1 ? { predicted: parseFloat(values[predictedIndex]) } : {})
      };
    });
  
  // Check if data appears to be quarterly
  const isQuarterlyData = data.some(item => 
    item.name.includes('Q') || 
    ['Q1', 'Q2', 'Q3', 'Q4'].includes(item.name)
  );
  
  if (isQuarterlyData) {
    return { quarterlyData: data };
  } else {
    return { monthlyData: data };
  }
};

/**
 * Process category data (like network, price, etc.)
 */
const processCategoryData = (lines: string[], headers: string[]): ParsedAnalyticsData => {
  const nameIndex = getHeaderIndex(headers, ['name', 'category']);
  const currentIndex = getHeaderIndex(headers, ['current', 'value']);
  const previousIndex = getHeaderIndex(headers, ['previous', 'old']);
  
  if (nameIndex === -1 || currentIndex === -1) return {};
  
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(val => val.trim());
      
      return {
        name: values[nameIndex],
        current: parseFloat(values[currentIndex]),
        previous: previousIndex !== -1 ? parseFloat(values[previousIndex]) : parseFloat(values[currentIndex]) - Math.random() * 10
      };
    });
  
  return { categoryData: data };
};

/**
 * Process demographics data
 */
const processDemographicsData = (lines: string[], headers: string[]): ParsedAnalyticsData => {
  const nameIndex = getHeaderIndex(headers, ['name', 'age', 'demographic']);
  const valueIndex = getHeaderIndex(headers, ['value', 'percentage']);
  
  if (nameIndex === -1 || valueIndex === -1) return {};
  
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(val => val.trim());
      
      return {
        name: values[nameIndex],
        value: parseFloat(values[valueIndex])
      };
    });
  
  return { demographicsData: data };
};

/**
 * Process churn risk data
 */
const processChurnRiskData = (lines: string[], headers: string[]): ParsedAnalyticsData => {
  const nameIndex = getHeaderIndex(headers, ['name', 'risk', 'category']);
  const valueIndex = getHeaderIndex(headers, ['value', 'percentage']);
  
  if (nameIndex === -1 || valueIndex === -1) return {};
  
  // Define colors for different risk levels
  const getColor = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('low')) return '#4ade80';
    if (lowerName.includes('medium')) return '#facc15';
    if (lowerName.includes('high')) return '#ef4444';
    return '#3B82F6';
  };
  
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(val => val.trim());
      
      return {
        name: values[nameIndex],
        value: parseFloat(values[valueIndex]),
        color: getColor(values[nameIndex])
      };
    });
  
  return { churnRiskData: data };
};

/**
 * Infer data type and process accordingly when headers are ambiguous
 */
const inferAndProcessData = (lines: string[], headers: string[]): ParsedAnalyticsData => {
  // Try to determine what type of data this is based on first column values
  const firstColumnValues = lines.slice(1)
    .filter(line => line.trim())
    .map(line => line.split(',')[0].trim());
  
  // Check for month names or abbreviations
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 
                 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  
  const hasMonths = firstColumnValues.some(val => 
    months.some(month => val.toLowerCase().includes(month))
  );
  
  if (hasMonths) {
    return processTimeSeriesData(lines, headers);
  }
  
  // Check for quarters (Q1, Q2, etc.)
  const hasQuarters = firstColumnValues.some(val => 
    val.toLowerCase().includes('q1') || 
    val.toLowerCase().includes('q2') || 
    val.toLowerCase().includes('q3') || 
    val.toLowerCase().includes('q4')
  );
  
  if (hasQuarters) {
    return processTimeSeriesData(lines, headers);
  }
  
  // Check for demographic data (age ranges)
  const hasDemographics = firstColumnValues.some(val => 
    val.includes('-') && val.includes('+') || 
    val.toLowerCase().includes('age')
  );
  
  if (hasDemographics) {
    return processDemographicsData(lines, headers);
  }
  
  // Check for risk categories
  const hasRiskCategories = firstColumnValues.some(val => 
    val.toLowerCase().includes('risk') || 
    val.toLowerCase().includes('low') ||
    val.toLowerCase().includes('medium') ||
    val.toLowerCase().includes('high')
  );
  
  if (hasRiskCategories) {
    return processChurnRiskData(lines, headers);
  }
  
  // Default to category data
  return processCategoryData(lines, headers);
};

/**
 * Helper to find index of a header by checking against multiple possible names
 */
const getHeaderIndex = (headers: string[], possibleNames: string[]): number => {
  const lowerCaseHeaders = headers.map(h => h.toLowerCase());
  return lowerCaseHeaders.findIndex(header => 
    possibleNames.some(name => header.includes(name.toLowerCase()))
  );
};
