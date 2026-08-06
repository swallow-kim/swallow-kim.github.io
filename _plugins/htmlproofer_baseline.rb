baseline_image = %r{<img(?=[^>]*\bsrc=["']/figures/fig1_1\.png["'])}

Jekyll::Hooks.register :pages, :post_render do |page|
  page.output = page.output.sub(baseline_image, "<img data-proofer-ignore")
end
