/**
 * VSCode Portfolio data loader.
 * Every visible string comes from data/*.json — deploy-portfolio swaps those
 * files, so nothing about the demo persona may live in index.html.
 */
(function () {
  'use strict';

  var FILES = ['site-config', 'navigation', 'hero', 'about', 'experience',
    'projects', 'skills', 'education', 'contact', 'footer'];

  /** Section id -> the filename shown in the explorer and tab strip. */
  var FILENAMES = {
    home: 'home.jsx',
    about: 'about.html',
    experience: 'experience.json',
    projects: 'projects.js',
    skills: 'skills.css',
    education: 'education.yaml',
    contact: 'contact.md',
  };

  var $ = function (sel) { return document.querySelector(sel); };
  var arr = function (v) { return Array.isArray(v) ? v : []; };
  var str = function (v) { return typeof v === 'string' && v.trim() !== ''; };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function setText(sel, value) {
    var el = $(sel);
    if (el && str(value)) el.textContent = value;
    return el;
  }
  function hide(sel) { var el = $(sel); if (el) el.style.display = 'none'; }
  function safe(label, fn) {
    try { fn(); } catch (e) { console.error('[' + label + ']', e); }
  }

  function load(name) {
    return fetch('data/' + name + '.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  Promise.all(FILES.map(load)).then(function (results) {
    var d = {};
    FILES.forEach(function (k, i) { d[k] = results[i] || {}; });
    render(d);
  });

  function render(d) {
    var hero = d.hero || {};
    var meta = (d['site-config'] && d['site-config'].meta) || {};
    var name = hero.name || meta.author || '';

    // ---- document + chrome identity
    safe('meta', function () {
      if (str(meta.title)) document.title = meta.title;
      else if (str(name)) document.title = name + (str(hero.title) ? ' — ' + hero.title : '');
      var setMeta = function (sel, val) {
        var el = document.head.querySelector(sel);
        if (el && str(val)) el.setAttribute('content', val);
      };
      setMeta('meta[name="description"]', meta.description || hero.intro);
      setMeta('meta[name="author"]', meta.author || name);
      setText('#window-title', (str(name) ? name : 'portfolio') + ' — Visual Studio Code');
      setText('#status-branch', str(name) ? 'main* — ' + name : 'main*');
    });

    // ---- explorer + tabs (same section list drives both)
    safe('nav', function () {
      var items = arr(d.navigation && d.navigation.menuItems)
        .filter(function (m) { return m && str(m.href) && FILENAMES[m.href.replace('#', '')]; });
      if (!items.length) {
        items = Object.keys(FILENAMES).map(function (id) {
          return { href: '#' + id, text: id };
        });
      }

      var brand = (d.navigation && d.navigation.brand && d.navigation.brand.name) || name;
      setText('#explorer-folder', str(brand) ? brand.replace(/\s+/g, '-').toLowerCase() : 'portfolio');

      var tree = $('#explorer-tree');
      var tabs = $('#editor-tabs');
      if (tree) tree.innerHTML = '';
      if (tabs) tabs.innerHTML = '';

      items.forEach(function (item, i) {
        var id = item.href.replace('#', '');
        var file = FILENAMES[id];
        var dot = file.lastIndexOf('.');

        if (tree) {
          tree.insertAdjacentHTML('beforeend',
            '<li><a href="#' + esc(id) + '"' + (i === 0 ? ' class="is-active"' : '') + '>' +
            esc(file.slice(0, dot)) + '<span class="ext">' + esc(file.slice(dot)) + '</span></a></li>');
        }
        if (tabs) {
          tabs.insertAdjacentHTML('beforeend',
            '<a class="vs-tab' + (i === 0 ? ' is-active' : '') + '" href="#' + esc(id) + '" role="tab">' +
            esc(file) + '</a>');
        }
      });

      // Keep explorer + tab highlight in sync with the section in view.
      var sections = items.map(function (i) { return document.getElementById(i.href.replace('#', '')); })
        .filter(Boolean);
      if ('IntersectionObserver' in window && sections.length) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            var href = '#' + en.target.id;
            document.querySelectorAll('.vs-tab, .vs-tree a').forEach(function (el) {
              el.classList.toggle('is-active', el.getAttribute('href') === href);
            });
            var f = FILENAMES[en.target.id];
            if (f) setText('#status-lang', f.slice(f.lastIndexOf('.') + 1).toUpperCase());
          });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { obs.observe(s); });
      }
    });

    // ---- hero
    safe('hero', function () {
      setText('#hero-eyebrow', hero.eyebrow || 'portfolio');
      setText('#hero-name', name);
      setText('#hero-role', hero.title);
      setText('#hero-intro', hero.intro || hero.summary);

      var cta = $('#hero-cta');
      var buttons = arr(hero.cta && hero.cta.buttons).filter(function (b) { return b && str(b.text) && str(b.href); });
      if (cta) {
        cta.innerHTML = buttons.map(function (b, i) {
          return '<a class="btn ' + (i === 0 ? 'btn--primary' : 'btn--ghost') + '" href="' + esc(b.href) + '">' +
            esc(b.text) + '</a>';
        }).join('');
      }

      var stats = $('#hero-stats');
      var statList = arr(hero.stats).filter(function (s) { return s && str(s.label); });
      if (stats) {
        stats.innerHTML = statList.map(function (s) {
          return '<li><span class="val">' + esc(s.value) + '</span><span class="lbl">' + esc(s.label) + '</span></li>';
        }).join('');
      }

      renderSocials('#hero-socials', hero.socialLinks);
    });

    // ---- about
    safe('about', function () {
      var about = d.about || {};
      setText('#about-label', about.sectionLabel || 'about');
      setText('#about-title', about.sectionTitle || 'About');
      var paras = arr(about.paragraphs).filter(str);
      var body = $('#about-body');
      if (body) body.innerHTML = paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

      var facts = arr(about.facts).filter(function (f) { return f && str(f.label) && str(f.value); });
      var dl = $('#about-facts');
      if (dl) {
        dl.innerHTML = facts.map(function (f) {
          return '<div><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>';
        }).join('');
      }
      if (!paras.length && !facts.length) hide('#about');

      var m = $('#explorer-meta');
      if (m) {
        m.innerHTML = facts.slice(0, 3).map(function (f) {
          return '<span>' + esc(f.label) + ': ' + esc(f.value) + '</span>';
        }).join('');
      }
    });

    // ---- experience
    safe('experience', function () {
      var ex = d.experience || {};
      setText('#experience-label', ex.sectionLabel || 'experience');
      setText('#experience-title', ex.sectionTitle || 'Experience');
      var roles = arr(ex.roles).filter(function (r) { return r && (str(r.position) || str(r.company)); });
      if (!roles.length) { hide('#experience'); return; }
      var list = $('#experience-list');
      if (!list) return;
      list.innerHTML = roles.map(function (r) {
        var points = arr(r.highlights).filter(str);
        var stack = arr(r.stack).filter(str);
        return '<article class="role">' +
          '<div class="role__head"><h3 class="role__title">' + esc(r.position) + '</h3>' +
          '<span class="role__period">' + esc(r.period) + '</span></div>' +
          '<p class="role__meta">' + esc(r.company) +
          (str(r.location) ? ' <span class="loc">· ' + esc(r.location) + '</span>' : '') + '</p>' +
          (str(r.summary) ? '<p class="role__summary">' + esc(r.summary) + '</p>' : '') +
          (points.length ? '<ul class="role__points">' + points.map(function (p) {
            return '<li>' + esc(p) + '</li>';
          }).join('') + '</ul>' : '') +
          (stack.length ? '<div class="chips">' + stack.map(function (s) {
            return '<span class="chip">' + esc(s) + '</span>';
          }).join('') + '</div>' : '') +
          '</article>';
      }).join('');
    });

    // ---- projects
    safe('projects', function () {
      var pr = d.projects || {};
      setText('#projects-label', pr.sectionLabel || 'projects');
      setText('#projects-title', pr.sectionTitle || 'Projects');
      var items = arr(pr.projects).filter(function (p) { return p && str(p.name); });
      if (!items.length) { hide('#projects'); return; }
      var list = $('#projects-list');
      if (!list) return;
      list.innerHTML = items.map(function (p) {
        var stack = arr(p.stack).filter(str);
        var links = arr(p.links).filter(function (l) { return l && str(l.url) && str(l.text); });
        return '<article class="project">' +
          '<p class="project__name">' + esc(p.name) + '</p>' +
          (str(p.label) ? '<p class="project__label">' + esc(p.label) + '</p>' : '') +
          (str(p.description) ? '<p class="project__desc">' + esc(p.description) + '</p>' : '') +
          (stack.length ? '<div class="chips">' + stack.map(function (s) {
            return '<span class="chip">' + esc(s) + '</span>';
          }).join('') + '</div>' : '') +
          (links.length ? '<div class="project__links">' + links.map(function (l) {
            return '<a href="' + esc(l.url) + '">' + esc(l.text) + '</a>';
          }).join('') + '</div>' : '') +
          '</article>';
      }).join('');
    });

    // ---- skills
    safe('skills', function () {
      var sk = d.skills || {};
      setText('#skills-label', sk.sectionLabel || 'skills');
      setText('#skills-title', sk.sectionTitle || 'Skills');
      var groups = arr(sk.groups).filter(function (g) { return g && str(g.name) && arr(g.skills).length; });
      if (!groups.length) { hide('#skills'); return; }
      var list = $('#skills-list');
      if (!list) return;
      list.innerHTML = groups.map(function (g) {
        return '<div class="skillgroup"><h3>' + esc(g.name) + '</h3><div class="chips">' +
          arr(g.skills).filter(str).map(function (s) {
            return '<span class="chip">' + esc(s) + '</span>';
          }).join('') + '</div></div>';
      }).join('');
    });

    // ---- education
    safe('education', function () {
      var ed = d.education || {};
      setText('#education-label', ed.sectionLabel || 'education');
      setText('#education-title', ed.sectionTitle || 'Education');
      var schools = arr(ed.schools).filter(function (s) { return s && (str(s.degree) || str(s.institution)); });
      var certs = arr(ed.certifications).filter(function (c) { return c && str(c.name); });
      if (!schools.length && !certs.length) { hide('#education'); return; }

      var list = $('#education-list');
      if (list) {
        list.innerHTML = schools.map(function (s) {
          return '<div class="school">' +
            '<p class="school__degree">' + esc(s.degree) + '</p>' +
            '<p class="school__inst">' + esc(s.institution) + '</p>' +
            (str(s.period) ? '<p class="school__period">' + esc(s.period) + '</p>' : '') +
            (str(s.detail) ? '<p class="school__period">' + esc(s.detail) + '</p>' : '') +
            '</div>';
        }).join('');
      }
      var cl = $('#certifications-list');
      if (cl) {
        cl.innerHTML = certs.map(function (c) {
          var extra = [c.issuer, c.year].filter(str).join(' · ');
          return '<span class="chip">' + esc(c.name) + (extra ? ' — ' + esc(extra) : '') + '</span>';
        }).join('');
      }
    });

    // ---- contact
    safe('contact', function () {
      var c = d.contact || {};
      setText('#contact-label', c.sectionLabel || 'contact');
      setText('#contact-title', c.sectionTitle || 'Contact');
      setText('#contact-subtitle', c.subtitle);
      var rows = [
        ['Email', c.email], ['Phone', c.phone],
        ['Location', c.location], ['Availability', c.availability],
      ].filter(function (r) { return str(r[1]); });
      var grid = $('#contact-details');
      if (grid) {
        grid.innerHTML = rows.map(function (r) {
          var val = r[0] === 'Email'
            ? '<a href="mailto:' + esc(r[1]) + '">' + esc(r[1]) + '</a>'
            : esc(r[1]);
          return '<div><dt>' + esc(r[0]) + '</dt><dd>' + val + '</dd></div>';
        }).join('');
      }
      renderSocials('#contact-socials', c.socialLinks);
    });

    // ---- footer
    safe('footer', function () {
      var f = d.footer || {};
      setText('#footer-text', f.text);
      setText('#footer-copyright', f.copyright);
      var links = arr(f.links).filter(function (l) { return l && str(l.url) && str(l.text); });
      var el = $('#footer-links');
      if (el) {
        el.innerHTML = links.map(function (l) {
          return '<a href="' + esc(l.url) + '">' + esc(l.text) + '</a>';
        }).join('');
      }
    });
  }

  function renderSocials(sel, links) {
    var el = $(sel);
    if (!el) return;
    var items = arr(links).filter(function (l) { return l && str(l.url) && str(l.platform); });
    el.innerHTML = items.map(function (l) {
      return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
        esc(l.platform) + '</a></li>';
    }).join('');
  }
})();
