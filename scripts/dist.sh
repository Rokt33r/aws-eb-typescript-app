{
  stat dist
} || {
  mkdir dist
}
zip dist/$npm_package_name.zip -r build package.json package-lock.json readme.md
