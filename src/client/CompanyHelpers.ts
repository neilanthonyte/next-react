export interface ICompanyHelpers {
  getActiveLocationId: () => string;
  getActiveLocationSlug: () => string;
  getAllAvailableLocationIds: () => string[];
}

// this class must be implemented by each company individually
