const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for Aggo diagnostic results
const mockDiagnosticData = {
  storeHealth: {
    score: 72,
    issues: [
      {
        id: '1',
        title: 'Slow Page Load Speed',
        description: 'Your product pages are loading 3.2s slower than optimal, affecting conversion rates.',
        severity: 'critical',
        impact: 'Potential 15% revenue loss (~$2,400/month)',
        fixable: true,
        estimatedTime: '2 minutes',
        category: 'performance'
      },
      {
        id: '2',
        title: 'Missing Alt Text on Images',
        description: '47 product images lack accessibility alt text, hurting SEO and compliance.',
        severity: 'warning',
        impact: 'SEO ranking decrease, accessibility issues',
        fixable: true,
        estimatedTime: '30 seconds',
        category: 'seo'
      },
      {
        id: '3',
        title: 'Abandoned Cart Recovery',
        description: 'No automated email sequence for cart abandonment (68% cart abandonment rate).',
        severity: 'critical',
        impact: 'Missing ~$8,500/month in recovered sales',
        fixable: true,
        estimatedTime: '5 minutes',
        category: 'conversion'
      },
      {
        id: '4',
        title: 'Mobile Checkout Friction',
        description: 'Mobile checkout process has 3 unnecessary steps, causing 23% drop-off.',
        severity: 'critical',
        impact: 'Potential $3,200/month revenue increase',
        fixable: true,
        estimatedTime: '3 minutes',
        category: 'mobile'
      }
    ]
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Aggo API is running' });
});

// Store diagnostic scan
app.post('/api/scan', (req, res) => {
  const { storeUrl } = req.body;
  
  if (!storeUrl) {
    return res.status(400).json({ error: 'Store URL is required' });
  }

  // Simulate AI scanning delay
  setTimeout(() => {
    res.json({
      success: true,
      storeUrl,
      scanId: `scan_${Date.now()}`,
      results: mockDiagnosticData.storeHealth
    });
  }, 2000);
});

// Get diagnostic results
app.get('/api/diagnostic/:scanId', (req, res) => {
  const { scanId } = req.params;
  
  res.json({
    scanId,
    results: mockDiagnosticData.storeHealth,
    timestamp: new Date().toISOString()
  });
});

// Fix issue endpoint
app.post('/api/fix/:issueId', (req, res) => {
  const { issueId } = req.params;
  const { previewMode = false } = req.body;
  
  const issue = mockDiagnosticData.storeHealth.issues.find(i => i.id === issueId);
  
  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }

  // Simulate AI fix process
  setTimeout(() => {
    res.json({
      success: true,
      issueId,
      previewMode,
      message: previewMode 
        ? `Preview generated for: ${issue.title}`
        : `Successfully fixed: ${issue.title}`,
      estimatedImpact: issue.impact,
      fixApplied: !previewMode
    });
  }, 1500);
});

// Preview fix endpoint
app.get('/api/preview/:issueId', (req, res) => {
  const { issueId } = req.params;
  
  const issue = mockDiagnosticData.storeHealth.issues.find(i => i.id === issueId);
  
  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }

  // Mock preview data
  const previewData = {
    issueId,
    title: issue.title,
    beforeScreenshot: '/api/screenshots/before.png',
    afterScreenshot: '/api/screenshots/after.png',
    changes: [
      'Optimized image compression',
      'Enabled browser caching',
      'Minified CSS and JavaScript'
    ],
    expectedImprovement: issue.impact
  };

  res.json(previewData);
});

// Batch fix endpoint
app.post('/api/fix-all', (req, res) => {
  const { issueIds } = req.body;
  
  if (!issueIds || !Array.isArray(issueIds)) {
    return res.status(400).json({ error: 'Issue IDs array is required' });
  }

  // Simulate batch fixing
  setTimeout(() => {
    const fixedIssues = issueIds.map(id => {
      const issue = mockDiagnosticData.storeHealth.issues.find(i => i.id === id);
      return {
        issueId: id,
        title: issue?.title || 'Unknown issue',
        status: 'fixed',
        impact: issue?.impact || 'Unknown impact'
      };
    });

    res.json({
      success: true,
      message: `Successfully fixed ${fixedIssues.length} issues`,
      fixedIssues,
      totalEstimatedImpact: '$10,900/month revenue recovery'
    });
  }, 3000);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Aggo API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
