/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-29 16:32:31
 * @LastEditors: voanit
 * @LastEditTime: 2021-02-05 17:02:46
 */
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.htmlName = ''
    this.isConfirm = false
    this.projectName = ''
    this.version = ''
    this.description = ''
    this.author = ''
  }
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称",
        default: this.projectName
      },
      {
        type: "input",
        name: "version",
        message: "请输入版本",
        default: this.version
      },
      {
        type: "input",
        name: "description",
        message: "请输入描述信息",
        default: this.description
      },
      {
        type: "input",
        name: "author",
        message: "请输入作者",
        default: this.author
      },
      {
        type: "input",
        name: "title",
        message: "请输入HTML模板名称",
        default: this.htmlName // Default to current folder name
      },
      {
        type: "confirm",
        name: "isConfirm",
        message: `以上项目信息您确定吗？`
      }
    ]);
    this.htmlName = answers.title
    this.isConfirm = answers.isConfirm
    this.projectName = answers.projectName
    this.version = answers.version
    this.description = answers.description
    this.author = answers.author
  }
  initPageJson(){
    const pkgJson = {
      "name": this.projectName,
      "version": this.version,
      "description": this.description,
      "main": "index.js",
      "scripts": {
        "build":"webpack",
        "test": "mocha --require @babel/register",
        "coverage":"nyc mocha --require @babel/register"
      },
      "author": this.author,
      "license": "ISC",
      "devDependencies": {
      },
      "dependencies": {
      }
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall(["vue"],{"save-dev":false});
    this.npmInstall(["babel-loader","mocha","nyc","babel-plugin-istanbul","@istanbuljs/nyc-config-babel","@babel/register","@babel/preset-env","@babel/core","webpack","webpack-cli","vue-template-compiler","vue-loader","vue-style-loader","css-loader","copy-webpack-plugin"],{"save-dev":true});
  }
  copyFiles(){
    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('example.js'),
      this.destinationPath('src/example.js')
    )
    this.fs.copyTpl(
      this.templatePath('example.spec.js'),
      this.destinationPath('test/example.spec.js')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      {
        title:this.htmlName
      }
    )
  }
};