module.exports = {
  name: 'npp-root',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/npp-root',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
