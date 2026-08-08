require "fileutils"
require "rake"

desc "Build the production site and run deterministic validation"
task :validate do
  FileUtils.rm_rf("_site")
  sh({ "JEKYLL_ENV" => "production" }, "jekyll", "build", "--trace", "--strict_front_matter")
  sh "htmlproofer", "./_site", "--disable-external"
  sh "npm", "run", "check:site"
  sh "jekyll", "build", "--config", "_config.yml,_config.qa.yml", "--trace", "--strict_front_matter"
  sh "npm", "run", "test:design"
  sh "npm", "run", "check:design"
end
