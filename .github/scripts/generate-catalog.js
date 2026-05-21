const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');

const CATEGORIES = ['agents', 'skills', 'mcps', 'resources'];
const ROOT = path.join(__dirname, '..', '..');

function readYamlFiles(category) {
  const categoryPath = path.join(ROOT, category);

  if (!fs.existsSync(categoryPath)) return [];

  return fs.readdirSync(categoryPath)
    .filter(dir => {
      if (dir.startsWith('.')) return false;
      return fs.statSync(path.join(categoryPath, dir)).isDirectory();
    })
    .map(dir => {
      const dirPath = path.join(categoryPath, dir);
      const files = fs.readdirSync(dirPath);

      const yamlFile = files.find(f => f.endsWith('.yaml') && !f.startsWith('.'));
      if (!yamlFile) return null;

      try {
        const content = fs.readFileSync(path.join(dirPath, yamlFile), 'utf8');
        const data = yaml.load(content);
        return {
          ...data,
          path: `${category}/${dir}`,
          hasReadme: files.includes('README.md'),
        };
      } catch (e) {
        console.warn(`Warning: no se pudo parsear ${category}/${dir}/${yamlFile}:`, e.message);
        return null;
      }
    })
    .filter(Boolean);
}

const catalog = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  agents: readYamlFiles('agents'),
  skills: readYamlFiles('skills'),
  mcps: readYamlFiles('mcps'),
  resources: readYamlFiles('resources'),
};

fs.writeFileSync(
  path.join(ROOT, 'CATALOG.json'),
  JSON.stringify(catalog, null, 2)
);

console.log(`CATALOG.json generado:`);
Object.entries(catalog).forEach(([key, val]) => {
  if (Array.isArray(val)) console.log(`  ${key}: ${val.length} items`);
});