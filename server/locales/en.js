module.exports = {
  errors: {
    pet: {
      notFound: 'Pet not found',
      failedToFetch: 'Failed to fetch pet data',
      failedToSave: 'Failed to save pet data',
      failedToDelete: 'Failed to delete pet data',
      failedToFeed: 'Failed to feed pet',
      failedToPlay: 'Failed to play with pet',
      failedToClean: 'Failed to clean pet'
    },
    server: {
      internalError: 'Internal Server Error',
      notFound: 'Resource not found',
      invalidRequest: 'Invalid request'
    }
  },
  success: {
    pet: {
      created: 'Pet created successfully',
      updated: 'Pet updated successfully',
      deleted: 'Pet deleted successfully',
      fed: 'Pet fed successfully',
      played: 'Pet played with successfully',
      cleaned: 'Pet cleaned successfully'
    }
  }
};