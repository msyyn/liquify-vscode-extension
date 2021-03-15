# Liquify conversion

Convert traditional/basic way of writing Liquid to the new `{%- liquid -%}` block code.

---

## Usage

Select a block of text and run the `> Liquify: Convert selection to a {% liquid %} block` command. Extension will attempt a conversion on the selected block of text.

---

## Disclaimer

Only supports simple conversions. For advanced blocks of Liquid, you should always go through the changes manually.

You need to also manually convert some blocks of text to proper formatting prior conversion. For example:

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

Later block of code can be converted without issues. First one will turn out weirdly converted.