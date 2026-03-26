// Test script to verify quiz routes can be loaded
console.log('Starting test...');

try {
    console.log('Attempting to load quizzes route...');
    const quizRoutes = require('./routes/quizzes');
    
    console.log('✓ Route loaded successfully');
    console.log('  Type:', typeof quizRoutes);
    console.log('  Constructor:', quizRoutes.constructor.name);
    
    // Check if it's an Express Router
    if (quizRoutes.stack) {
        console.log('  ✓ Is an Express Router with', quizRoutes.stack.length, 'layers');
        quizRoutes.stack.forEach((layer, i) => {
            console.log(`    Layer ${i}:`, layer.route ? layer.route.path : layer.name);
        });
    }
    
} catch (error) {
    console.error('✗ ERROR loading route:', error.message);
    if (error.stack) {
        console.error('Stack trace:');
        console.error(error.stack);
    }
}
