"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "category",
      [
        {
          categoryid: 5,
          category_name: "Health & Fitness",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 6,
          category_name: "Travel",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 7,
          category_name: "Food & Cooking",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 8,
          category_name: "Science",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 9,
          category_name: "Art & Design",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 10,
          category_name: "Sports",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 11,
          category_name: "Music",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 12,
          category_name: "Photography",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 13,
          category_name: "Gaming",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 14,
          category_name: "Fashion",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 15,
          category_name: "Finance",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 16,
          category_name: "Politics",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 17,
          category_name: "Environment",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 18,
          category_name: "Psychology",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 19,
          category_name: "History",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          categoryid: 20,
          category_name: "Philosophy",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("category", {
      categoryid: {
        [Sequelize.Op.in]: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      }
    }, {});
  },
};
