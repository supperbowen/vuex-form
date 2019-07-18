const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "current"
      },
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ],
  ['@babel/plugin-proposal-class-properties', {
    'loose': true
  }]
]

module.exports = {
  presets,
  plugins
}