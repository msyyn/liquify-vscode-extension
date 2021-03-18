# Liquify conversion

![https://i.imgur.com/hk7fOAx.gif](https://i.imgur.com/hk7fOAx.gif)

Convert your multiple theme tags to use a single {% liquid %} code block.

---

## Usage

Select a block of text and run the `> Liquify: Convert selection to a {% liquid %} block` command. Extension will attempt a conversion on the selected block of text.

---

## Disclaimer

Only supports conversion of Liquid code, i.e. not a mix of HTML and Liquid. It is also advised to format your code properly prior conversion.

Especially single-line `{% capture %}` tags should be manually converted for best results. See examples:

**❌ WRONGLY FORMATTED**
```liquid
{%- capture natural_height_ratio -%}{{ 100 | divided_by: section.settings.image.aspect_ratio }}%{% endcapture %}
```

**✅ CORRECT FORMATTING**
```liquid
{%- capture natural_height_ratio -%}
  {{ 100 | divided_by: section.settings.image.aspect_ratio | append: '%' }}
{% endcapture %}
```

Later block of code can be converted without issues. First block of code might turn out weirdly formatted. 

**Note that second block uses append filter to add the % symbol.*

Single line `{% comment %}` tags are automatically split into multiple lines during the conversion process.

---

## Known issues 
- Single-line `{% capture %}` formatting does not work properly in all cases
- Does not work with blocks containing a mix of HTML & Liquid code
- Converted text does not tabulate all lines properly

You can [open a issue on GitHub](https://github.com/msyyn/liquify-vscode-extension/issues).

--- 

## Contributing

You can contribute or fork the source code here: https://github.com/msyyn/liquify-vscode-extension