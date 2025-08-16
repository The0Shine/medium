const { Category } = require('../models');

async function addCategories() {
  try {
    const categories = [
      { categoryid: 5, category_name: "Health & Fitness", status: 1 },
      { categoryid: 6, category_name: "Travel", status: 1 },
      { categoryid: 7, category_name: "Food & Cooking", status: 1 },
      { categoryid: 8, category_name: "Science", status: 1 },
      { categoryid: 9, category_name: "Art & Design", status: 1 },
      { categoryid: 10, category_name: "Sports", status: 1 },
      { categoryid: 11, category_name: "Music", status: 1 },
      { categoryid: 12, category_name: "Photography", status: 1 },
      { categoryid: 13, category_name: "Gaming", status: 1 },
      { categoryid: 14, category_name: "Fashion", status: 1 },
      { categoryid: 15, category_name: "Finance", status: 1 },
      { categoryid: 16, category_name: "Politics", status: 1 },
      { categoryid: 17, category_name: "Environment", status: 1 },
      { categoryid: 18, category_name: "Psychology", status: 1 },
      { categoryid: 19, category_name: "History", status: 1 },
      { categoryid: 20, category_name: "Philosophy", status: 1 },
    ];

    for (const categoryData of categories) {
      const [category, created] = await Category.findOrCreate({
        where: { categoryid: categoryData.categoryid },
        defaults: categoryData
      });
      
      if (created) {
        console.log(`✅ Created category: ${categoryData.category_name}`);
      } else {
        console.log(`⚠️  Category already exists: ${categoryData.category_name}`);
      }
    }

    console.log('\n🎉 All categories processed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding categories:', error);
    process.exit(1);
  }
}

addCategories();
