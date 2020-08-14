<?php 


$options['sites'] = array (
  0 => 'hikewithgravity.com',
  1 => 'test.hikewithgravity.com',
);
$options['profiles'] = array (
  0 => 'standard',
  1 => 'minimal',
);
$options['packages'] = array (
  'base' => 
  array (
    'modules' => 
    array (
      'gravity_blocks' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/custom/gravity_blocks/gravity_blocks.module',
        'basename' => 'gravity_blocks.module',
        'name' => 'Gravity Blocks',
        'info' => 
        array (
          'name' => 'Gravity Blocks',
          'type' => 'module',
          'description' => 'Blocks for hikewithgravity.com.',
          'core' => '8.x',
          'package' => 'Custom',
        ),
        'schema_version' => 0,
        'version' => NULL,
      ),
      'entity_reference_revisions' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/entity_reference_revisions/entity_reference_revisions.module',
        'basename' => 'entity_reference_revisions.module',
        'name' => 'Entity Reference Revisions',
        'info' => 
        array (
          'name' => 'Entity Reference Revisions',
          'type' => 'module',
          'description' => 'Adds a Entity Reference field type with revision support.',
          'package' => 'Field types',
          'test_dependencies' => 
          array (
            0 => 'diff:diff',
          ),
          'version' => '8.x-1.1',
          'core' => '8.x',
          'project' => 'entity_reference_revisions',
          'datestamp' => 1485526388,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.1',
      ),
      'pathauto' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/pathauto/pathauto.module',
        'basename' => 'pathauto.module',
        'name' => 'Pathauto',
        'info' => 
        array (
          'name' => 'Pathauto',
          'description' => 'Provides a mechanism for modules to automatically generate aliases for the content they manage.',
          'type' => 'module',
          'dependencies' => 
          array (
            0 => 'ctools:ctools',
            1 => 'drupal:path',
            2 => 'token:token',
          ),
          'configure' => 'entity.pathauto_pattern.collection',
          'recommends' => 
          array (
            0 => 'redirect:redirect',
          ),
          'version' => '8.x-1.0-beta2',
          'core' => '8.x',
          'project' => 'pathauto',
          'datestamp' => 1484781494,
        ),
        'schema_version' => '8106',
        'version' => '8.x-1.0-beta2',
      ),
      'paragraphs_type_permissions' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/paragraphs/modules/paragraphs_type_permissions/paragraphs_type_permissions.module',
        'basename' => 'paragraphs_type_permissions.module',
        'name' => 'Paragraphs Type Permissions',
        'info' => 
        array (
          'name' => 'Paragraphs Type Permissions',
          'type' => 'module',
          'description' => 'Allows users to configure permissions for individual paragraphs types.',
          'package' => 'Paragraphs',
          'dependencies' => 
          array (
            0 => 'paragraphs',
          ),
          'version' => '8.x-1.0',
          'core' => '8.x',
          'project' => 'paragraphs',
          'datestamp' => 1469725741,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0',
      ),
      'paragraphs_demo' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/paragraphs/modules/paragraphs_demo/paragraphs_demo.module',
        'basename' => 'paragraphs_demo.module',
        'name' => 'Paragraphs Demo',
        'info' => 
        array (
          'description' => 'Provides multilingual demo paragraphs types.',
          'dependencies' => 
          array (
            0 => 'paragraphs',
            1 => 'field',
            2 => 'image',
            3 => 'field_ui',
            4 => 'block',
            5 => 'language',
            6 => 'content_translation',
            7 => 'node',
            8 => 'search_api_db',
            9 => 'search_api',
            10 => 'views',
          ),
          'test_dependencies' => 
          array (
            0 => 'search_api_db',
            1 => 'search_api',
          ),
          'hidden' => false,
          'name' => 'Paragraphs Demo',
          'package' => 'Paragraphs',
          'type' => 'module',
          'version' => '8.x-1.0',
          'core' => '8.x',
          'project' => 'paragraphs',
          'datestamp' => 1469725741,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0',
      ),
      'paragraphs' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/paragraphs/paragraphs.module',
        'basename' => 'paragraphs.module',
        'name' => 'Paragraphs',
        'info' => 
        array (
          'name' => 'Paragraphs',
          'type' => 'module',
          'description' => 'Enables the creation of paragraphs entities. To safely uninstall, go first to Structure > Paragraphs types > Settings.',
          'package' => 'Paragraphs',
          'dependencies' => 
          array (
            0 => 'entity_reference_revisions',
          ),
          'test_dependencies' => 
          array (
            0 => 'diff',
            1 => 'replicate',
          ),
          'version' => '8.x-1.0',
          'core' => '8.x',
          'project' => 'paragraphs',
          'datestamp' => 1469725741,
        ),
        'schema_version' => '8008',
        'version' => '8.x-1.0',
      ),
      'ctools_views' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/ctools/modules/ctools_views/ctools_views.module',
        'basename' => 'ctools_views.module',
        'name' => 'Chaos tools Views',
        'info' => 
        array (
          'name' => 'Chaos tools Views',
          'type' => 'module',
          'description' => 'A set of improvements to the core Views code that allows for greater control over Blocks.',
          'package' => 'Chaos tool suite',
          'dependencies' => 
          array (
            0 => 'block',
            1 => 'views',
          ),
          'version' => '8.x-3.0-alpha27',
          'core' => '8.x',
          'project' => 'ctools',
          'datestamp' => 1471724024,
        ),
        'schema_version' => 0,
        'version' => '8.x-3.0-alpha27',
      ),
      'ctools' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/ctools/ctools.module',
        'basename' => 'ctools.module',
        'name' => 'Chaos tools',
        'info' => 
        array (
          'name' => 'Chaos tools',
          'type' => 'module',
          'description' => 'Provides a number of utility and helper APIs for Drupal developers and site builders.',
          'package' => 'Chaos tool suite',
          'version' => '8.x-3.0-alpha27',
          'core' => '8.x',
          'project' => 'ctools',
          'datestamp' => 1471724024,
        ),
        'schema_version' => 0,
        'version' => '8.x-3.0-alpha27',
      ),
      'google_analytics' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/google_analytics/google_analytics.module',
        'basename' => 'google_analytics.module',
        'name' => 'Google Analytics',
        'info' => 
        array (
          'name' => 'Google Analytics',
          'type' => 'module',
          'description' => 'Allows your site to be tracked by Google Analytics by adding a Javascript tracking code to every page.',
          'package' => 'Statistics',
          'configure' => 'google_analytics.admin_settings_form',
          'test_dependencies' => 
          array (
            0 => 'php:php',
            1 => 'token:token',
          ),
          'version' => '8.x-2.1',
          'core' => '8.x',
          'project' => 'google_analytics',
          'datestamp' => 1470779958,
        ),
        'schema_version' => 0,
        'version' => '8.x-2.1',
      ),
      'metatag_test_tag' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/tests/modules/metatag_test_tag/metatag_test_tag.module',
        'basename' => 'metatag_test_tag.module',
        'name' => 'Metatag Tests: Tag',
        'info' => 
        array (
          'name' => 'Metatag Tests: Tag',
          'type' => 'module',
          'description' => 'Support module for testing handling of a custom meta tag.',
          'package' => 'Testing',
          'dependencies' => 
          array (
            0 => 'metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_test_custom_route' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/tests/modules/metatag_test_custom_route/metatag_test_custom_route.module',
        'basename' => 'metatag_test_custom_route.module',
        'name' => 'Metatag: Test Custom Route',
        'info' => 
        array (
          'name' => 'Metatag: Test Custom Route',
          'type' => 'module',
          'description' => 'Support module for testing handling of a custom route that only inherits the global configuration.',
          'package' => 'Testing',
          'dependencies' => 
          array (
            0 => 'metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_hreflang' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_hreflang/metatag_hreflang.module',
        'basename' => 'metatag_hreflang.module',
        'name' => 'Metatag: hreflang',
        'info' => 
        array (
          'name' => 'Metatag: hreflang',
          'type' => 'module',
          'description' => 'Provides support for the hreflang meta tag with some extra logic to simplify it.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_app_links' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_app_links/metatag_app_links.module',
        'basename' => 'metatag_app_links.module',
        'name' => 'Metatag: App Links',
        'info' => 
        array (
          'name' => 'Metatag: App Links',
          'type' => 'module',
          'description' => 'Provides support for applinks.org meta tags.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_open_graph' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_open_graph/metatag_open_graph.module',
        'basename' => 'metatag_open_graph.module',
        'name' => 'Metatag: Open Graph',
        'info' => 
        array (
          'name' => 'Metatag: Open Graph',
          'type' => 'module',
          'description' => 'Provides support for Open Graph Protocol meta tags.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => '8102',
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_favicons' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_favicons/metatag_favicons.module',
        'basename' => 'metatag_favicons.module',
        'name' => 'Metatag: favicons',
        'info' => 
        array (
          'name' => 'Metatag: favicons',
          'type' => 'module',
          'description' => 'Provides support for many different favicons.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_open_graph_products' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_open_graph_products/metatag_open_graph_products.module',
        'basename' => 'metatag_open_graph_products.module',
        'name' => 'Metatag: Open Graph Products',
        'info' => 
        array (
          'name' => 'Metatag: Open Graph Products',
          'type' => 'module',
          'description' => 'Provides additional Open Graph Protocol meta tags for describing products.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
            1 => 'metatag:metatag_open_graph',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_dc_advanced' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_dc_advanced/metatag_dc_advanced.module',
        'basename' => 'metatag_dc_advanced.module',
        'name' => 'Metatag: Dublin Core Advanced',
        'info' => 
        array (
          'name' => 'Metatag: Dublin Core Advanced',
          'type' => 'module',
          'description' => 'Provides forty additional meta tags from the <a href="http://dublincore.org/">Dublin Core Metadata Institute</a>.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
            1 => 'metatag:metatag_dc',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_google_cse' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_google_cse/metatag_google_cse.module',
        'basename' => 'metatag_google_cse.module',
        'name' => 'Metatag: Google Custom Search Engine (CSE)',
        'info' => 
        array (
          'name' => 'Metatag: Google Custom Search Engine (CSE)',
          'type' => 'module',
          'description' => 'Provides support for meta tags used for Google Custom Search Engine.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag_mobile' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag_mobile/metatag_mobile.module',
        'basename' => 'metatag_mobile.module',
        'name' => 'Metatag: Mobile & UI Adjustments',
        'info' => 
        array (
          'name' => 'Metatag: Mobile & UI Adjustments',
          'type' => 'module',
          'description' => 'Provides support for meta tags used to control the mobile browser experience.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'metatag:metatag',
          ),
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-beta12',
      ),
      'metatag' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/metatag/metatag.module',
        'basename' => 'metatag.module',
        'name' => 'Metatag',
        'info' => 
        array (
          'name' => 'Metatag',
          'type' => 'module',
          'description' => 'Manage meta tags for all entities.',
          'package' => 'SEO',
          'dependencies' => 
          array (
            0 => 'drupal:field',
            1 => 'token:token',
          ),
          'configure' => 'entity.metatag_defaults.collection',
          'version' => '8.x-1.0-beta12',
          'core' => '8.x',
          'project' => 'metatag',
          'datestamp' => 1483477148,
        ),
        'schema_version' => '8107',
        'version' => '8.x-1.0-beta12',
      ),
      'markdown' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/markdown/markdown.module',
        'basename' => 'markdown.module',
        'name' => 'Markdown filter',
        'info' => 
        array (
          'name' => 'Markdown filter',
          'type' => 'module',
          'description' => 'Allows content to be submitted using Markdown, a simple plain-text syntax that is transformed into valid HTML.',
          'package' => 'Input filters',
          'version' => '8.x-1.1',
          'core' => '8.x',
          'project' => 'markdown',
          'datestamp' => 1475761141,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.1',
      ),
      'flippy' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/flippy/flippy.module',
        'basename' => 'flippy.module',
        'name' => 'Flippy',
        'info' => 
        array (
          'name' => 'Flippy',
          'core' => '8.x',
          'description' => 'Allows administrators to define custom pagers for navigation in lists of nodes.',
          'type' => 'module',
        ),
        'schema_version' => 0,
        'version' => NULL,
      ),
      'token' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/token/token.module',
        'basename' => 'token.module',
        'name' => 'Token',
        'info' => 
        array (
          'type' => 'module',
          'name' => 'Token',
          'description' => 'Provides a user interface for the Token API and some missing core tokens.',
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'token',
          'datestamp' => 1483290545,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-rc1',
      ),
      'webprofiler' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/webprofiler/webprofiler.module',
        'basename' => 'webprofiler.module',
        'name' => 'Web Profiler',
        'info' => 
        array (
          'name' => 'Web Profiler',
          'type' => 'module',
          'description' => 'Drupal Web Profiler.',
          'package' => 'Development',
          'configure' => 'webprofiler.settings',
          'tags' => 
          array (
            0 => 'developer',
          ),
          'dependencies' => 
          array (
            0 => 'devel',
          ),
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => '8001',
        'version' => '8.x-1.0-rc1',
      ),
      'devel_entity_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/tests/modules/devel_entity_test/devel_entity_test.module',
        'basename' => 'devel_entity_test.module',
        'name' => 'Devel entity test module',
        'info' => 
        array (
          'name' => 'Devel entity test module',
          'type' => 'module',
          'description' => 'Provides entity types for Devel tests.',
          'package' => 'Testing',
          'dependencies' => 
          array (
            0 => 'field',
            1 => 'text',
            2 => 'entity_test',
          ),
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-rc1',
      ),
      'devel_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/tests/modules/devel_test/devel_test.module',
        'basename' => 'devel_test.module',
        'name' => 'Devel test module',
        'info' => 
        array (
          'name' => 'Devel test module',
          'type' => 'module',
          'description' => 'Support module for Devel testing.',
          'package' => 'Testing',
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-rc1',
      ),
      'kint' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/kint/kint.module',
        'basename' => 'kint.module',
        'name' => 'Devel Kint',
        'info' => 
        array (
          'name' => 'Devel Kint',
          'type' => 'module',
          'description' => 'Wrapper for Kint debugging tool',
          'package' => 'Development',
          'tags' => 
          array (
            0 => 'developer',
          ),
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-rc1',
      ),
      'devel_generate_example' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/devel_generate/tests/modules/devel_generate_example/devel_generate_example.module',
        'basename' => 'devel_generate_example.module',
        'name' => 'Devel generate Example',
        'info' => 
        array (
          'name' => 'Devel generate Example',
          'type' => 'module',
          'description' => 'Create an example of DevelGenerate plugin type for testing purposing.',
          'package' => 'Development',
          'configure' => 'admin/config/development/generate',
          'tags' => 
          array (
            0 => 'developer',
          ),
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-rc1',
      ),
      'devel_generate' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/devel_generate/devel_generate.module',
        'basename' => 'devel_generate.module',
        'name' => 'Devel generate',
        'info' => 
        array (
          'type' => 'module',
          'name' => 'Devel generate',
          'description' => 'Generate dummy users, nodes, menus, taxonomy terms...',
          'package' => 'Development',
          'tags' => 
          array (
            0 => 'developer',
          ),
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0-rc1',
      ),
      'devel' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/devel/devel.module',
        'basename' => 'devel.module',
        'name' => 'Devel',
        'info' => 
        array (
          'type' => 'module',
          'name' => 'Devel',
          'description' => 'Various blocks, pages, and functions for developers.',
          'package' => 'Development',
          'configure' => 'devel.admin_settings',
          'tags' => 
          array (
            0 => 'developer',
          ),
          'version' => '8.x-1.0-rc1',
          'core' => '8.x',
          'project' => 'devel',
          'datestamp' => 1484837926,
        ),
        'schema_version' => '8002',
        'version' => '8.x-1.0-rc1',
      ),
      'facebook_comments' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/modules/contrib/facebook_comments/facebook_comments.module',
        'basename' => 'facebook_comments.module',
        'name' => 'Facebook comments',
        'info' => 
        array (
          'name' => 'Facebook comments',
          'description' => 'Integrates Facebook comments on nodes',
          'type' => 'module',
          'configure' => 'facebook_comments.settings',
          'version' => '8.x-1.0',
          'core' => '8.x',
          'project' => 'facebook_comments',
          'datestamp' => 1485074589,
        ),
        'schema_version' => 0,
        'version' => '8.x-1.0',
      ),
      'editor_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/editor/tests/modules/editor_test.module',
        'basename' => 'editor_test.module',
        'name' => 'Text Editor test',
        'info' => 
        array (
          'name' => 'Text Editor test',
          'type' => 'module',
          'description' => 'Support module for the Text Editor module tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'editor' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/editor/editor.module',
        'basename' => 'editor.module',
        'name' => 'Text Editor',
        'info' => 
        array (
          'name' => 'Text Editor',
          'type' => 'module',
          'description' => 'Provides a means to associate text formats with text editor libraries such as WYSIWYGs or toolbars.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'filter',
            1 => 'file',
          ),
          'configure' => 'filter.admin_overview',
        ),
        'schema_version' => '8001',
        'version' => '8.2.6',
      ),
      'automated_cron' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/automated_cron/automated_cron.module',
        'basename' => 'automated_cron.module',
        'name' => 'Automated Cron',
        'info' => 
        array (
          'name' => 'Automated Cron',
          'type' => 'module',
          'description' => 'Provides an automated way to run cron jobs, by executing them at the end of a server response.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'system.cron_settings',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'content_translation' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/content_translation/content_translation.module',
        'basename' => 'content_translation.module',
        'name' => 'Content Translation',
        'info' => 
        array (
          'name' => 'Content Translation',
          'type' => 'module',
          'description' => 'Allows users to translate content entities.',
          'dependencies' => 
          array (
            0 => 'language',
          ),
          'package' => 'Multilingual',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'language.content_settings_page',
        ),
        'schema_version' => '8002',
        'version' => '8.2.6',
      ),
      'syslog' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/syslog/syslog.module',
        'basename' => 'syslog.module',
        'name' => 'Syslog',
        'info' => 
        array (
          'name' => 'Syslog',
          'type' => 'module',
          'description' => 'Logs and records system events to syslog.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'system.logging_settings',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'user_form_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/user/tests/modules/user_form_test/user_form_test.module',
        'basename' => 'user_form_test.module',
        'name' => 'User module form tests',
        'info' => 
        array (
          'name' => 'User module form tests',
          'type' => 'module',
          'description' => 'Support module for user form testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'user_access_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/user/tests/modules/user_access_test/user_access_test.module',
        'basename' => 'user_access_test.module',
        'name' => 'User access tests',
        'info' => 
        array (
          'name' => 'User access tests',
          'type' => 'module',
          'description' => 'Support module for user access testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'user_hooks_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/user/tests/modules/user_hooks_test/user_hooks_test.module',
        'basename' => 'user_hooks_test.module',
        'name' => 'User module hooks tests',
        'info' => 
        array (
          'name' => 'User module hooks tests',
          'type' => 'module',
          'description' => 'Support module for user hooks testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'user' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/user/user.module',
        'basename' => 'user.module',
        'name' => 'User',
        'info' => 
        array (
          'name' => 'User',
          'type' => 'module',
          'description' => 'Manages the user registration and login system.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'required' => true,
          'configure' => 'user.admin_index',
          'dependencies' => 
          array (
            0 => 'system',
          ),
        ),
        'schema_version' => '8100',
        'version' => '8.2.6',
      ),
      'config_install_dependency_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config/tests/config_install_dependency_test/config_install_dependency_test.module',
        'basename' => 'config_install_dependency_test.module',
        'name' => 'Config install dependency test',
        'info' => 
        array (
          'name' => 'Config install dependency test',
          'type' => 'module',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config_import_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config/tests/config_import_test/config_import_test.module',
        'basename' => 'config_import_test.module',
        'name' => 'Configuration import test',
        'info' => 
        array (
          'name' => 'Configuration import test',
          'type' => 'module',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config_entity_static_cache_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config/tests/config_entity_static_cache_test/config_entity_static_cache_test.module',
        'basename' => 'config_entity_static_cache_test.module',
        'name' => 'Configuration entity static cache test',
        'info' => 
        array (
          'name' => 'Configuration entity static cache test',
          'type' => 'module',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config/tests/config_test/config_test.module',
        'basename' => 'config_test.module',
        'name' => 'Configuration test',
        'info' => 
        array (
          'name' => 'Configuration test',
          'type' => 'module',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config/config.module',
        'basename' => 'config.module',
        'name' => 'Configuration Manager',
        'info' => 
        array (
          'name' => 'Configuration Manager',
          'type' => 'module',
          'description' => 'Allows administrators to manage configuration changes.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'config.sync',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'contact_storage_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/contact/tests/modules/contact_storage_test/contact_storage_test.module',
        'basename' => 'contact_storage_test.module',
        'name' => 'Contact test storage',
        'info' => 
        array (
          'name' => 'Contact test storage',
          'type' => 'module',
          'description' => 'Tests that contact messages can be stored.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'contact',
            1 => 'user',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'contact' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/contact/contact.module',
        'basename' => 'contact.module',
        'name' => 'Contact',
        'info' => 
        array (
          'name' => 'Contact',
          'type' => 'module',
          'description' => 'Enables the use of both personal and site-wide contact forms.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.contact_form.collection',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'file_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/file/tests/file_test/file_test.module',
        'basename' => 'file_test.module',
        'name' => 'File test',
        'info' => 
        array (
          'name' => 'File test',
          'type' => 'module',
          'description' => 'Support module for file handling tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'file' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/file/file.module',
        'basename' => 'file.module',
        'name' => 'File',
        'info' => 
        array (
          'name' => 'File',
          'type' => 'module',
          'description' => 'Defines a file field type.',
          'package' => 'Field types',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'responsive_image' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/responsive_image/responsive_image.module',
        'basename' => 'responsive_image.module',
        'name' => 'Responsive Image',
        'info' => 
        array (
          'name' => 'Responsive Image',
          'type' => 'module',
          'description' => 'Provides an image formatter and breakpoint mappings to output responsive images using the HTML5 picture tag.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'breakpoint',
            1 => 'image',
          ),
          'configure' => 'entity.responsive_image_style.collection',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_crud_hook_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_crud_hook_test/entity_crud_hook_test.module',
        'basename' => 'entity_crud_hook_test.module',
        'name' => 'Entity CRUD Hooks Test',
        'info' => 
        array (
          'name' => 'Entity CRUD Hooks Test',
          'type' => 'module',
          'description' => 'Support module for CRUD hook tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_test/entity_test.module',
        'basename' => 'entity_test.module',
        'name' => 'Entity CRUD test module',
        'info' => 
        array (
          'name' => 'Entity CRUD test module',
          'type' => 'module',
          'description' => 'Provides entity types based upon the CRUD API.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
            1 => 'text',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'module_required_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/module_required_test/module_required_test.module',
        'basename' => 'module_required_test.module',
        'name' => 'Module required test',
        'info' => 
        array (
          'name' => 'Module required test',
          'type' => 'module',
          'description' => 'Support module for module system testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'drupal:node (>=8.x)',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'database_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/database_test/database_test.module',
        'basename' => 'database_test.module',
        'name' => 'Database Test',
        'info' => 
        array (
          'name' => 'Database Test',
          'type' => 'module',
          'description' => 'Support module for Database layer tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'update_script_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/update_script_test/update_script_test.module',
        'basename' => 'update_script_test.module',
        'name' => 'Update script test',
        'info' => 
        array (
          'name' => 'Update script test',
          'type' => 'module',
          'description' => 'Support module for update script testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => '8001',
        'version' => '8.2.6',
      ),
      'entity_test_operation' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_test_operation/entity_test_operation.module',
        'basename' => 'entity_test_operation.module',
        'name' => 'Entity Operation Test',
        'info' => 
        array (
          'name' => 'Entity Operation Test',
          'type' => 'module',
          'description' => 'Provides a test operation to entities.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'theme_region_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/theme_region_test/theme_region_test.module',
        'basename' => 'theme_region_test.module',
        'name' => 'Theme region test',
        'info' => 
        array (
          'name' => 'Theme region test',
          'type' => 'module',
          'description' => 'Provides hook implementations for testing regions.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'system_module_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/system_module_test/system_module_test.module',
        'basename' => 'system_module_test.module',
        'name' => 'System test',
        'info' => 
        array (
          'name' => 'System test',
          'type' => 'module',
          'description' => 'Provides hook implementations for testing System module functionality.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'common_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/common_test/common_test.module',
        'basename' => 'common_test.module',
        'name' => 'Common Test',
        'info' => 
        array (
          'name' => 'Common Test',
          'type' => 'module',
          'description' => 'Support module for Common tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'session_exists_cache_context_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/session_exists_cache_context_test/session_exists_cache_context_test.module',
        'basename' => 'session_exists_cache_context_test.module',
        'name' => 'session.exists cache context test',
        'info' => 
        array (
          'name' => 'session.exists cache context test',
          'type' => 'module',
          'description' => 'Support module for session.exists cache context testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_schema_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_schema_test/entity_schema_test.module',
        'basename' => 'entity_schema_test.module',
        'name' => 'Entity schema test module',
        'info' => 
        array (
          'name' => 'Entity schema test module',
          'type' => 'module',
          'description' => 'Provides entity and field definitions to test entity schema.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'entity_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'form_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/form_test/form_test.module',
        'basename' => 'form_test.module',
        'name' => 'FormAPI Test',
        'info' => 
        array (
          'name' => 'FormAPI Test',
          'type' => 'module',
          'description' => 'Support module for Form API tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'twig_theme_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/twig_theme_test/twig_theme_test.module',
        'basename' => 'twig_theme_test.module',
        'name' => 'Twig theme test',
        'info' => 
        array (
          'name' => 'Twig theme test',
          'type' => 'module',
          'description' => 'Support module for Twig theme system testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'batch_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/batch_test/batch_test.module',
        'basename' => 'batch_test.module',
        'name' => 'Batch API test',
        'info' => 
        array (
          'name' => 'Batch API test',
          'type' => 'module',
          'description' => 'Support module for Batch API tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'menu_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/menu_test/menu_test.module',
        'basename' => 'menu_test.module',
        'name' => 'Hook menu tests',
        'info' => 
        array (
          'name' => 'Hook menu tests',
          'type' => 'module',
          'description' => 'Support module for menu hook testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'test_page_test',
            1 => 'menu_ui',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'link_generation_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/link_generation_test/link_generation_test.module',
        'basename' => 'link_generation_test.module',
        'name' => 'Link generation test support',
        'info' => 
        array (
          'name' => 'Link generation test support',
          'type' => 'module',
          'description' => 'Test hooks fired in link generation.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'ajax_forms_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/ajax_forms_test/ajax_forms_test.module',
        'basename' => 'ajax_forms_test.module',
        'name' => 'AJAX form test mock module',
        'info' => 
        array (
          'name' => 'AJAX form test mock module',
          'type' => 'module',
          'description' => 'Test for AJAX form calls.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'common_test_cron_helper' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/common_test_cron_helper/common_test_cron_helper.module',
        'basename' => 'common_test_cron_helper.module',
        'name' => 'Common Test Cron Helper',
        'info' => 
        array (
          'name' => 'Common Test Cron Helper',
          'type' => 'module',
          'description' => 'Helper module for CronRunTestCase::testCronExceptions().',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'experimental_module_requirements_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/experimental_module_requirements_test/experimental_module_requirements_test.module',
        'basename' => 'experimental_module_requirements_test.module',
        'name' => 'Experimental Requirements Test',
        'info' => 
        array (
          'name' => 'Experimental Requirements Test',
          'type' => 'module',
          'description' => 'Module in the experimental package to test hook_requirements() with an experimental module.',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'experimental_module_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/experimental_module_test/experimental_module_test.module',
        'basename' => 'experimental_module_test.module',
        'name' => 'Experimental Test',
        'info' => 
        array (
          'name' => 'Experimental Test',
          'type' => 'module',
          'description' => 'Module in the experimental package to test experimental functionality.',
          'package' => 'Core (Experimental)',
          'version' => '8.y.x-unstable',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.y.x-unstable',
      ),
      'experimental_module_dependency_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/experimental_module_dependency_test/experimental_module_dependency_test.module',
        'basename' => 'experimental_module_dependency_test.module',
        'name' => 'Experimental Dependency Test',
        'info' => 
        array (
          'name' => 'Experimental Dependency Test',
          'type' => 'module',
          'description' => 'Module with a dependency in the experimental package.',
          'package' => 'Testing',
          'dependencies' => 
          array (
            0 => 'experimental_module_test',
          ),
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_reference_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_reference_test/entity_reference_test.module',
        'basename' => 'entity_reference_test.module',
        'name' => 'Entity Reference Test',
        'info' => 
        array (
          'name' => 'Entity Reference Test',
          'type' => 'module',
          'description' => 'Support module for the Entity Reference tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'node',
            1 => 'user',
            2 => 'views',
            3 => 'entity_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'theme_page_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/theme_page_test/theme_page_test.module',
        'basename' => 'theme_page_test.module',
        'name' => 'Theme page test',
        'info' => 
        array (
          'name' => 'Theme page test',
          'type' => 'module',
          'description' => 'Support module for theme system testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'plugin_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/plugin_test/plugin_test.module',
        'basename' => 'plugin_test.module',
        'name' => 'Plugin Test Support',
        'info' => 
        array (
          'name' => 'Plugin Test Support',
          'type' => 'module',
          'description' => 'Test that plugins can provide plugins and provide namespace discovery for plugin test implementations.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'theme_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/theme_test/theme_test.module',
        'basename' => 'theme_test.module',
        'name' => 'Theme test',
        'info' => 
        array (
          'name' => 'Theme test',
          'type' => 'module',
          'description' => 'Support module for theme system testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_test_extra' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_test_extra/entity_test_extra.module',
        'basename' => 'entity_test_extra.module',
        'name' => 'Entity test extra',
        'info' => 
        array (
          'name' => 'Entity test extra',
          'type' => 'module',
          'description' => 'Provides extra fields for entity test entity types.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'entity_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'system_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/system_test/system_test.module',
        'basename' => 'system_test.module',
        'name' => 'System test',
        'info' => 
        array (
          'name' => 'System test',
          'type' => 'module',
          'description' => 'Support module for system testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'system_test.configure',
          'configure_parameters' => 
          array (
            'foo' => 'bar',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'theme_suggestions_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/theme_suggestions_test/theme_suggestions_test.module',
        'basename' => 'theme_suggestions_test.module',
        'name' => 'Theme suggestions test',
        'info' => 
        array (
          'name' => 'Theme suggestions test',
          'type' => 'module',
          'description' => 'Support module for testing theme suggestions.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'session_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/session_test/session_test.module',
        'basename' => 'session_test.module',
        'name' => 'Session test',
        'info' => 
        array (
          'name' => 'Session test',
          'type' => 'module',
          'description' => 'Support module for session data testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'module_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/module_test/module_test.module',
        'basename' => 'module_test.module',
        'name' => 'Module test',
        'info' => 
        array (
          'name' => 'Module test',
          'type' => 'module',
          'description' => 'Support module for module system testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_test_constraints' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/entity_test_constraints/entity_test_constraints.module',
        'basename' => 'entity_test_constraints.module',
        'name' => 'Entity constraints test module',
        'info' => 
        array (
          'name' => 'Entity constraints test module',
          'type' => 'module',
          'description' => 'Tests extending and altering entity constraints.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'entity_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'twig_extension_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/twig_extension_test/twig_extension_test.module',
        'basename' => 'twig_extension_test.module',
        'name' => 'Twig Extension Test',
        'info' => 
        array (
          'name' => 'Twig Extension Test',
          'type' => 'module',
          'description' => 'Support module for testing Twig extensions.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'path_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/tests/modules/path_test/path_test.module',
        'basename' => 'path_test.module',
        'name' => 'Hook path tests',
        'info' => 
        array (
          'name' => 'Hook path tests',
          'type' => 'module',
          'description' => 'Support module for path hook testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'system' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/system/system.module',
        'basename' => 'system.module',
        'name' => 'System',
        'info' => 
        array (
          'name' => 'System',
          'type' => 'module',
          'description' => 'Handles general site configuration for administrators.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'required' => true,
          'configure' => 'system.admin_config_system',
        ),
        'schema_version' => '8202',
        'version' => '8.2.6',
      ),
      'menu_link_content' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/menu_link_content/menu_link_content.module',
        'basename' => 'menu_link_content.module',
        'name' => 'Custom Menu Links',
        'info' => 
        array (
          'name' => 'Custom Menu Links',
          'type' => 'module',
          'description' => 'Allows administrators to create custom menu links.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'link',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'big_pipe_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/big_pipe/tests/modules/big_pipe_test/big_pipe_test.module',
        'basename' => 'big_pipe_test.module',
        'name' => 'BigPipe test',
        'info' => 
        array (
          'name' => 'BigPipe test',
          'type' => 'module',
          'description' => 'Support module for BigPipe testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'big_pipe' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/big_pipe/big_pipe.module',
        'basename' => 'big_pipe.module',
        'name' => 'BigPipe',
        'info' => 
        array (
          'name' => 'BigPipe',
          'type' => 'module',
          'description' => 'Sends pages using the BigPipe technique that allows browsers to show them much faster.',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'help_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/help/tests/modules/help_test/help_test.module',
        'basename' => 'help_test.module',
        'name' => 'help_test',
        'info' => 
        array (
          'name' => 'help_test',
          'type' => 'module',
          'core' => '8.x',
          'package' => 'Testing',
          'dependencies' => 
          array (
            0 => 'help',
          ),
        ),
        'schema_version' => 0,
        'version' => NULL,
      ),
      'help' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/help/help.module',
        'basename' => 'help.module',
        'name' => 'Help',
        'info' => 
        array (
          'name' => 'Help',
          'type' => 'module',
          'description' => 'Manages the display of online help.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'filter_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/filter/tests/filter_test/filter_test.module',
        'basename' => 'filter_test.module',
        'name' => 'Filter test module',
        'info' => 
        array (
          'name' => 'Filter test module',
          'type' => 'module',
          'description' => 'Tests filter hooks and functions.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'filter',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'filter' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/filter/filter.module',
        'basename' => 'filter.module',
        'name' => 'Filter',
        'info' => 
        array (
          'name' => 'Filter',
          'type' => 'module',
          'description' => 'Filters content in preparation for display.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'filter.admin_overview',
          'dependencies' => 
          array (
            0 => 'user',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'statistics' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/statistics/statistics.module',
        'basename' => 'statistics.module',
        'name' => 'Statistics',
        'info' => 
        array (
          'name' => 'Statistics',
          'type' => 'module',
          'description' => 'Logs content statistics for your site.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'statistics.settings',
          'dependencies' => 
          array (
            0 => 'node',
          ),
        ),
        'schema_version' => '8002',
        'version' => '8.2.6',
      ),
      'hal' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/hal/hal.module',
        'basename' => 'hal.module',
        'name' => 'HAL',
        'info' => 
        array (
          'name' => 'HAL',
          'type' => 'module',
          'description' => 'Serializes entities using Hypertext Application Language.',
          'package' => 'Web services',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'rest',
            1 => 'serialization',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'node_access_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/node/tests/modules/node_access_test/node_access_test.module',
        'basename' => 'node_access_test.module',
        'name' => 'Node module access tests',
        'info' => 
        array (
          'name' => 'Node module access tests',
          'type' => 'module',
          'description' => 'Support module for node permission testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'node_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/node/tests/modules/node_test/node_test.module',
        'basename' => 'node_test.module',
        'name' => 'Node module tests',
        'info' => 
        array (
          'name' => 'Node module tests',
          'type' => 'module',
          'description' => 'Support module for node related testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'node_access_test_language' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/node/tests/modules/node_access_test_language/node_access_test_language.module',
        'basename' => 'node_access_test_language.module',
        'name' => 'Node module access tests language',
        'info' => 
        array (
          'name' => 'Node module access tests language',
          'type' => 'module',
          'description' => 'Support module for language-aware node access testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'options',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'node_access_test_empty' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/node/tests/modules/node_access_test_empty/node_access_test_empty.module',
        'basename' => 'node_access_test_empty.module',
        'name' => 'Node module empty access tests',
        'info' => 
        array (
          'name' => 'Node module empty access tests',
          'type' => 'module',
          'description' => 'Support module for node permission testing. Provides empty grants hook implementations.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'node_test_exception' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/node/tests/modules/node_test_exception/node_test_exception.module',
        'basename' => 'node_test_exception.module',
        'name' => 'Node module exception tests',
        'info' => 
        array (
          'name' => 'Node module exception tests',
          'type' => 'module',
          'description' => 'Support module for node related exception testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'node' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/node/node.module',
        'basename' => 'node.module',
        'name' => 'Node',
        'info' => 
        array (
          'name' => 'Node',
          'type' => 'module',
          'description' => 'Allows content to be submitted to the site and displayed on pages.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.node_type.collection',
          'dependencies' => 
          array (
            0 => 'text',
          ),
        ),
        'schema_version' => '8003',
        'version' => '8.2.6',
      ),
      'page_cache_form_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/page_cache/tests/modules/page_cache_form_test.module',
        'basename' => 'page_cache_form_test.module',
        'name' => 'Page Cache Form Test',
        'info' => 
        array (
          'name' => 'Page Cache Form Test',
          'type' => 'module',
          'description' => 'Support module for the Page Cache module tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'page_cache' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/page_cache/page_cache.module',
        'basename' => 'page_cache.module',
        'name' => 'Internal Page Cache',
        'info' => 
        array (
          'name' => 'Internal Page Cache',
          'type' => 'module',
          'description' => 'Caches pages for anonymous users. Use when an external page cache is not available.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config_translation_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config_translation/tests/modules/config_translation_test/config_translation_test.module',
        'basename' => 'config_translation_test.module',
        'name' => 'Configuration Translation Test',
        'info' => 
        array (
          'name' => 'Configuration Translation Test',
          'description' => 'Helpers to test the configuration translation system',
          'type' => 'module',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'config_translation',
            1 => 'config_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config_translation' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/config_translation/config_translation.module',
        'basename' => 'config_translation.module',
        'name' => 'Configuration Translation',
        'info' => 
        array (
          'name' => 'Configuration Translation',
          'type' => 'module',
          'description' => 'Provides a translation interface for configuration.',
          'package' => 'Multilingual',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'config_translation.mapper_list',
          'dependencies' => 
          array (
            0 => 'locale',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'shortcut' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/shortcut/shortcut.module',
        'basename' => 'shortcut.module',
        'name' => 'Shortcut',
        'info' => 
        array (
          'name' => 'Shortcut',
          'type' => 'module',
          'description' => 'Allows users to manage customizable lists of shortcut links.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.shortcut_set.collection',
          'dependencies' => 
          array (
            0 => 'link',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'options_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/options/tests/options_test/options_test.module',
        'basename' => 'options_test.module',
        'name' => 'Options test',
        'info' => 
        array (
          'name' => 'Options test',
          'type' => 'module',
          'description' => 'Support module for the Options module tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'options' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/options/options.module',
        'basename' => 'options.module',
        'name' => 'Options',
        'info' => 
        array (
          'name' => 'Options',
          'type' => 'module',
          'description' => 'Defines selection, check box and radio button widgets for text and numeric fields.',
          'package' => 'Field types',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
            1 => 'text',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'migrate_drupal' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/migrate_drupal/migrate_drupal.module',
        'basename' => 'migrate_drupal.module',
        'name' => 'Migrate Drupal',
        'info' => 
        array (
          'name' => 'Migrate Drupal',
          'type' => 'module',
          'description' => 'Contains migrations from older Drupal versions.',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'migrate',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'comment_empty_title_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/comment/tests/modules/comment_empty_title_test/comment_empty_title_test.module',
        'basename' => 'comment_empty_title_test.module',
        'name' => 'Comment empty titles test',
        'info' => 
        array (
          'name' => 'Comment empty titles test',
          'type' => 'module',
          'description' => 'Support module for testing empty title accessibility with Comment module.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'comment',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'comment_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/comment/tests/modules/comment_test/comment_test.module',
        'basename' => 'comment_test.module',
        'name' => 'Comment test',
        'info' => 
        array (
          'name' => 'Comment test',
          'type' => 'module',
          'description' => 'Support module for Comment module testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'comment',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'comment' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/comment/comment.module',
        'basename' => 'comment.module',
        'name' => 'Comment',
        'info' => 
        array (
          'name' => 'Comment',
          'type' => 'module',
          'description' => 'Allows users to comment on and discuss published content.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'text',
          ),
          'configure' => 'comment.admin',
        ),
        'schema_version' => '8200',
        'version' => '8.2.6',
      ),
      'forum' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/forum/forum.module',
        'basename' => 'forum.module',
        'name' => 'Forum',
        'info' => 
        array (
          'name' => 'Forum',
          'type' => 'module',
          'description' => 'Provides discussion forums.',
          'dependencies' => 
          array (
            0 => 'node',
            1 => 'history',
            2 => 'taxonomy',
            3 => 'comment',
            4 => 'options',
          ),
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'forum.overview',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'datetime' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/datetime/datetime.module',
        'basename' => 'datetime.module',
        'name' => 'Datetime',
        'info' => 
        array (
          'name' => 'Datetime',
          'type' => 'module',
          'description' => 'Defines datetime form elements and a datetime field type.',
          'package' => 'Field types',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'outside_in_test_css' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/outside_in/tests/modules/outside_in_test_css/outside_in_test_css.module',
        'basename' => 'outside_in_test_css.module',
        'name' => 'CSS Test fix',
        'info' => 
        array (
          'name' => 'CSS Test fix',
          'type' => 'module',
          'description' => 'Provides CSS fixes for tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'outside_in',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'outside_in' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/outside_in/outside_in.module',
        'basename' => 'outside_in.module',
        'name' => 'Settings Tray',
        'info' => 
        array (
          'name' => 'Settings Tray',
          'type' => 'module',
          'description' => 'Provides the ability to change the most common configuration from the Drupal front-end.',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'block',
            1 => 'toolbar',
            2 => 'contextual',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'update_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/update/tests/modules/update_test/update_test.module',
        'basename' => 'update_test.module',
        'name' => 'Update test',
        'info' => 
        array (
          'name' => 'Update test',
          'type' => 'module',
          'description' => 'Support module for update module testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'update' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/update/update.module',
        'basename' => 'update.module',
        'name' => 'Update Manager',
        'info' => 
        array (
          'name' => 'Update Manager',
          'type' => 'module',
          'description' => 'Checks for available updates, and can securely install or update modules and themes via a web interface.',
          'version' => 'VERSION',
          'package' => 'Core',
          'core' => '8.x',
          'configure' => 'update.settings',
          'dependencies' => 
          array (
            0 => 'file',
          ),
        ),
        'schema_version' => '8001',
        'version' => '8.2.6',
      ),
      'field_test_boolean_access_denied' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/field/tests/modules/field_test_boolean_access_denied/field_test_boolean_access_denied.module',
        'basename' => 'field_test_boolean_access_denied.module',
        'name' => 'Boolean field Test',
        'info' => 
        array (
          'name' => 'Boolean field Test',
          'type' => 'module',
          'description' => 'Support module for the field and entity display tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'field',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'field_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/field/tests/modules/field_test/field_test.module',
        'basename' => 'field_test.module',
        'name' => 'Field API Test',
        'info' => 
        array (
          'name' => 'Field API Test',
          'type' => 'module',
          'description' => 'Support module for the Field API tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'entity_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'field_third_party_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/field/tests/modules/field_third_party_test/field_third_party_test.module',
        'basename' => 'field_third_party_test.module',
        'name' => 'Field Third Party Settings Test',
        'info' => 
        array (
          'name' => 'Field Third Party Settings Test',
          'type' => 'module',
          'description' => 'Support module for the Field API tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'entity_test',
            1 => 'field_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'field' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/field/field.module',
        'basename' => 'field.module',
        'name' => 'Field',
        'info' => 
        array (
          'name' => 'Field',
          'type' => 'module',
          'description' => 'Field API to add fields to entities like nodes and users.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => '8003',
        'version' => '8.2.6',
      ),
      'menu_ui' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/menu_ui/menu_ui.module',
        'basename' => 'menu_ui.module',
        'name' => 'Menu UI',
        'info' => 
        array (
          'name' => 'Menu UI',
          'type' => 'module',
          'description' => 'Allows administrators to customize the site navigation menu.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.menu.collection',
          'dependencies' => 
          array (
            0 => 'menu_link_content',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'aggregator' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/aggregator/aggregator.module',
        'basename' => 'aggregator.module',
        'name' => 'Aggregator',
        'info' => 
        array (
          'name' => 'Aggregator',
          'type' => 'module',
          'description' => 'Aggregates syndicated content (RSS, RDF, and Atom feeds) from external sources.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'aggregator.admin_settings',
          'dependencies' => 
          array (
            0 => 'file',
            1 => 'options',
          ),
        ),
        'schema_version' => '8200',
        'version' => '8.2.6',
      ),
      'path' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/path/path.module',
        'basename' => 'path.module',
        'name' => 'Path',
        'info' => 
        array (
          'name' => 'Path',
          'type' => 'module',
          'description' => 'Allows users to rename URLs.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'path.admin_overview',
        ),
        'schema_version' => '8200',
        'version' => '8.2.6',
      ),
      'block_place' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/block_place/block_place.module',
        'basename' => 'block_place.module',
        'name' => 'Place Blocks',
        'info' => 
        array (
          'name' => 'Place Blocks',
          'type' => 'module',
          'description' => 'Allow administrators to place blocks from any Drupal page',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'block',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'toolbar_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/toolbar/tests/modules/toolbar_test/toolbar_test.module',
        'basename' => 'toolbar_test.module',
        'name' => 'Toolbar module API tests',
        'info' => 
        array (
          'name' => 'Toolbar module API tests',
          'type' => 'module',
          'description' => 'Support module for toolbar testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'toolbar_disable_user_toolbar' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/toolbar/tests/modules/toolbar_disable_user_toolbar/toolbar_disable_user_toolbar.module',
        'basename' => 'toolbar_disable_user_toolbar.module',
        'name' => 'Disable user toolbar',
        'info' => 
        array (
          'name' => 'Disable user toolbar',
          'type' => 'module',
          'description' => 'Support module for testing toolbar without user toolbar',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'toolbar' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/toolbar/toolbar.module',
        'basename' => 'toolbar.module',
        'name' => 'Toolbar',
        'info' => 
        array (
          'name' => 'Toolbar',
          'type' => 'module',
          'description' => 'Provides a toolbar that shows the top-level administration menu items and links from other modules.',
          'core' => '8.x',
          'package' => 'Core',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'breakpoint',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'image_module_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/image/tests/modules/image_module_test/image_module_test.module',
        'basename' => 'image_module_test.module',
        'name' => 'Image test',
        'info' => 
        array (
          'name' => 'Image test',
          'type' => 'module',
          'description' => 'Provides hook implementations for testing Image module functionality.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'image' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/image/image.module',
        'basename' => 'image.module',
        'name' => 'Image',
        'info' => 
        array (
          'name' => 'Image',
          'type' => 'module',
          'description' => 'Defines an image field type and provides image manipulation tools.',
          'package' => 'Field types',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'file',
          ),
          'configure' => 'entity.image_style.collection',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'book_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/book/tests/modules/book_test/book_test.module',
        'basename' => 'book_test.module',
        'name' => 'Book module tests',
        'info' => 
        array (
          'name' => 'Book module tests',
          'type' => 'module',
          'description' => 'Support module for book module testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'book_breadcrumb_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/book/tests/modules/book_breadcrumb_test/book_breadcrumb_test.module',
        'basename' => 'book_breadcrumb_test.module',
        'name' => 'Book module breadcrumb tests',
        'info' => 
        array (
          'name' => 'Book module breadcrumb tests',
          'type' => 'module',
          'description' => 'Support module for book module breadcrumb testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'book' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/book/book.module',
        'basename' => 'book.module',
        'name' => 'Book',
        'info' => 
        array (
          'name' => 'Book',
          'type' => 'module',
          'description' => 'Allows users to create and organize related content in an outline.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'node',
          ),
          'configure' => 'book.settings',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'link' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/link/link.module',
        'basename' => 'link.module',
        'name' => 'Link',
        'info' => 
        array (
          'name' => 'Link',
          'type' => 'module',
          'description' => 'Provides a simple link field type.',
          'core' => '8.x',
          'package' => 'Field types',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'field',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'text' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/text/text.module',
        'basename' => 'text.module',
        'name' => 'Text',
        'info' => 
        array (
          'name' => 'Text',
          'type' => 'module',
          'description' => 'Defines simple text field types.',
          'package' => 'Field types',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
            1 => 'filter',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'history' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/history/history.module',
        'basename' => 'history.module',
        'name' => 'History',
        'info' => 
        array (
          'name' => 'History',
          'type' => 'module',
          'description' => 'Records which user has read which content.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'node',
          ),
        ),
        'schema_version' => '8101',
        'version' => '8.2.6',
      ),
      'simpletest' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/simpletest/simpletest.module',
        'basename' => 'simpletest.module',
        'name' => 'Testing',
        'info' => 
        array (
          'name' => 'Testing',
          'type' => 'module',
          'description' => 'Provides a framework for unit and functional testing.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'simpletest.settings',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'migrate_drupal_ui' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/migrate_drupal_ui/migrate_drupal_ui.module',
        'basename' => 'migrate_drupal_ui.module',
        'name' => 'Migrate Drupal UI',
        'info' => 
        array (
          'name' => 'Migrate Drupal UI',
          'type' => 'module',
          'description' => 'Provides a user interface for migrating from older Drupal versions.',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'migrate_drupal_ui.upgrade',
          'dependencies' => 
          array (
            0 => 'migrate',
            1 => 'migrate_drupal',
            2 => 'dblog',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'tracker' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/tracker/tracker.module',
        'basename' => 'tracker.module',
        'name' => 'Activity Tracker',
        'info' => 
        array (
          'name' => 'Activity Tracker',
          'type' => 'module',
          'description' => 'Enables tracking of recent content for users.',
          'dependencies' => 
          array (
            0 => 'node',
            1 => 'comment',
          ),
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'action' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/action/action.module',
        'basename' => 'action.module',
        'name' => 'Actions',
        'info' => 
        array (
          'name' => 'Actions',
          'type' => 'module',
          'description' => 'Perform tasks on specific events triggered within the system.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.action.collection',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'block_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/block/tests/modules/block_test/block_test.module',
        'basename' => 'block_test.module',
        'name' => 'Block test',
        'info' => 
        array (
          'name' => 'Block test',
          'type' => 'module',
          'description' => 'Provides test blocks.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'block',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'block' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/block/block.module',
        'basename' => 'block.module',
        'name' => 'Block',
        'info' => 
        array (
          'name' => 'Block',
          'type' => 'module',
          'description' => 'Controls the visual building blocks a page is constructed with. Blocks are boxes of content rendered into an area, or region, of a web page.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'block.admin_display',
        ),
        'schema_version' => '8003',
        'version' => '8.2.6',
      ),
      'content_moderation' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/content_moderation/content_moderation.module',
        'basename' => 'content_moderation.module',
        'name' => 'Content Moderation',
        'info' => 
        array (
          'name' => 'Content Moderation',
          'type' => 'module',
          'description' => 'Provides moderation states for content',
          'version' => 'VERSION',
          'core' => '8.x',
          'package' => 'Core (Experimental)',
          'configure' => 'content_moderation.overview',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'field_ui_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/field_ui/tests/modules/field_ui_test/field_ui_test.module',
        'basename' => 'field_ui_test.module',
        'name' => 'Field UI test',
        'info' => 
        array (
          'name' => 'Field UI test',
          'type' => 'module',
          'description' => 'Support module for Field UI tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'field_ui' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/field_ui/field_ui.module',
        'basename' => 'field_ui.module',
        'name' => 'Field UI',
        'info' => 
        array (
          'name' => 'Field UI',
          'type' => 'module',
          'description' => 'User interface for the Field API.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'entity_serialization_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/serialization/tests/modules/entity_serialization_test/entity_serialization_test.module',
        'basename' => 'entity_serialization_test.module',
        'name' => 'Entity serialization test support',
        'info' => 
        array (
          'name' => 'Entity serialization test support',
          'type' => 'module',
          'description' => 'Provides test support for entity serialization tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'serialization' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/serialization/serialization.module',
        'basename' => 'serialization.module',
        'name' => 'Serialization',
        'info' => 
        array (
          'name' => 'Serialization',
          'type' => 'module',
          'description' => 'Provides a service for (de)serializing data to/from formats such as JSON and XML',
          'package' => 'Web services',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'views_entity_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/views/tests/modules/views_entity_test/views_entity_test.module',
        'basename' => 'views_entity_test.module',
        'name' => 'Views Entity Test',
        'info' => 
        array (
          'name' => 'Views Entity Test',
          'type' => 'module',
          'description' => 'Provides base fields for views tests of entity_test entity type.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'views',
            1 => 'entity_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'views_test_data' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/views/tests/modules/views_test_data/views_test_data.module',
        'basename' => 'views_test_data.module',
        'name' => 'Views Test',
        'info' => 
        array (
          'name' => 'Views Test',
          'type' => 'module',
          'description' => 'Test module for Views.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'views',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'views' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/views/views.module',
        'basename' => 'views.module',
        'name' => 'Views',
        'info' => 
        array (
          'name' => 'Views',
          'type' => 'module',
          'description' => 'Create customized lists and queries from your database.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'filter',
          ),
        ),
        'schema_version' => '8201',
        'version' => '8.2.6',
      ),
      'telephone' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/telephone/telephone.module',
        'basename' => 'telephone.module',
        'name' => 'Telephone',
        'info' => 
        array (
          'name' => 'Telephone',
          'type' => 'module',
          'description' => 'Defines a field type for telephone numbers.',
          'package' => 'Field types',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'field',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'rdf_conflicting_namespaces' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rdf/tests/rdf_conflicting_namespaces/rdf_conflicting_namespaces.module',
        'basename' => 'rdf_conflicting_namespaces.module',
        'name' => 'RDF module conflicting namespaces test',
        'info' => 
        array (
          'name' => 'RDF module conflicting namespaces test',
          'type' => 'module',
          'description' => 'Test conflicting namespace declaration.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'rdf',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'rdf_test_namespaces' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rdf/tests/rdf_test_namespaces/rdf_test_namespaces.module',
        'basename' => 'rdf_test_namespaces.module',
        'name' => 'RDF module namespaces test',
        'info' => 
        array (
          'name' => 'RDF module namespaces test',
          'type' => 'module',
          'description' => 'Test namespace declaration.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'rdf',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'rdf' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rdf/rdf.module',
        'basename' => 'rdf.module',
        'name' => 'RDF',
        'info' => 
        array (
          'name' => 'RDF',
          'type' => 'module',
          'description' => 'Enriches your content with metadata to let other applications (e.g. search engines, aggregators) better understand its relationships and attributes.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'locale' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/locale/locale.module',
        'basename' => 'locale.module',
        'name' => 'Interface Translation',
        'info' => 
        array (
          'name' => 'Interface Translation',
          'type' => 'module',
          'description' => 'Translates the built-in user interface.',
          'configure' => 'locale.translate_page',
          'package' => 'Multilingual',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'language',
            1 => 'file',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'tour_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/tour/tests/tour_test/tour_test.module',
        'basename' => 'tour_test.module',
        'name' => 'Tour module tests',
        'info' => 
        array (
          'name' => 'Tour module tests',
          'type' => 'module',
          'description' => 'Tests module for tour module.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'tour',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'tour' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/tour/tour.module',
        'basename' => 'tour.module',
        'name' => 'Tour',
        'info' => 
        array (
          'name' => 'Tour',
          'type' => 'module',
          'description' => 'Provides guided tours.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'search_embedded_form' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/search/tests/modules/search_embedded_form/search_embedded_form.module',
        'basename' => 'search_embedded_form.module',
        'name' => 'Search Embedded Form',
        'info' => 
        array (
          'name' => 'Search Embedded Form',
          'type' => 'module',
          'description' => 'Support module for Search module testing of embedded forms.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'search_query_alter' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/search/tests/modules/search_query_alter/search_query_alter.module',
        'basename' => 'search_query_alter.module',
        'name' => 'Test Search Query Alter',
        'info' => 
        array (
          'name' => 'Test Search Query Alter',
          'type' => 'module',
          'description' => 'Support module for Search module testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'search_langcode_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/search/tests/modules/search_langcode_test/search_langcode_test.module',
        'basename' => 'search_langcode_test.module',
        'name' => 'Test search entity langcode',
        'info' => 
        array (
          'name' => 'Test search entity langcode',
          'type' => 'module',
          'description' => 'Support module for search module testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'search_date_query_alter' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/search/tests/modules/search_date_query_alter/search_date_query_alter.module',
        'basename' => 'search_date_query_alter.module',
        'name' => 'Search Date Query Alter',
        'info' => 
        array (
          'name' => 'Search Date Query Alter',
          'type' => 'module',
          'description' => 'Test module that adds date conditions to node searches.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'search' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/search/search.module',
        'basename' => 'search.module',
        'name' => 'Search',
        'info' => 
        array (
          'name' => 'Search',
          'type' => 'module',
          'description' => 'Enables site-wide keyword searching.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.search_page.collection',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'migrate_prepare_row_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/migrate/tests/modules/migrate_prepare_row_test/migrate_prepare_row_test.module',
        'basename' => 'migrate_prepare_row_test.module',
        'name' => 'Migrate module prepareRow tests',
        'info' => 
        array (
          'name' => 'Migrate module prepareRow tests',
          'type' => 'module',
          'description' => 'Support module for source plugin prepareRow testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'migrate' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/migrate/migrate.module',
        'basename' => 'migrate.module',
        'name' => 'Migrate',
        'info' => 
        array (
          'name' => 'Migrate',
          'type' => 'module',
          'description' => 'Handles migrations',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => '8001',
        'version' => '8.2.6',
      ),
      'views_ui_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/views_ui/tests/modules/views_ui_test/views_ui_test.module',
        'basename' => 'views_ui_test.module',
        'name' => 'Views UI Test',
        'info' => 
        array (
          'name' => 'Views UI Test',
          'type' => 'module',
          'description' => 'Test module for Views UI.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'views_ui',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'views_ui' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/views_ui/views_ui.module',
        'basename' => 'views_ui.module',
        'name' => 'Views UI',
        'info' => 
        array (
          'name' => 'Views UI',
          'type' => 'module',
          'description' => 'Administrative interface for Views.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.view.collection',
          'dependencies' => 
          array (
            0 => 'views',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'block_content_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/block_content/tests/modules/block_content_test/block_content_test.module',
        'basename' => 'block_content_test.module',
        'name' => 'Custom Block module tests',
        'info' => 
        array (
          'name' => 'Custom Block module tests',
          'type' => 'module',
          'description' => 'Support module for custom block related testing.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'block_content',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'block_content' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/block_content/block_content.module',
        'basename' => 'block_content.module',
        'name' => 'Custom Block',
        'info' => 
        array (
          'name' => 'Custom Block',
          'type' => 'module',
          'description' => 'Allows the creation of custom blocks through the user interface.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'block',
            1 => 'text',
            2 => 'user',
          ),
          'configure' => 'entity.block_content.collection',
        ),
        'schema_version' => '8003',
        'version' => '8.2.6',
      ),
      'taxonomy_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/taxonomy/tests/modules/taxonomy_test/taxonomy_test.module',
        'basename' => 'taxonomy_test.module',
        'name' => 'Taxonomy test',
        'info' => 
        array (
          'name' => 'Taxonomy test',
          'type' => 'module',
          'description' => 'Provides test hook implementations for taxonomy tests',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'taxonomy',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'taxonomy_crud' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/taxonomy/tests/modules/taxonomy_crud/taxonomy_crud.module',
        'basename' => 'taxonomy_crud.module',
        'name' => 'Taxonomy CRUD tests',
        'info' => 
        array (
          'name' => 'Taxonomy CRUD tests',
          'type' => 'module',
          'description' => 'Provides 3rd party settings for vocabulary.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'taxonomy',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'taxonomy' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/taxonomy/taxonomy.module',
        'basename' => 'taxonomy.module',
        'name' => 'Taxonomy',
        'info' => 
        array (
          'name' => 'Taxonomy',
          'type' => 'module',
          'description' => 'Enables the categorization of content.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'node',
            1 => 'text',
          ),
          'configure' => 'entity.taxonomy_vocabulary.collection',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'ban' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/ban/ban.module',
        'basename' => 'ban.module',
        'name' => 'Ban',
        'info' => 
        array (
          'name' => 'Ban',
          'type' => 'module',
          'description' => 'Enables banning of IP addresses.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'ban.admin_page',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'datetime_range' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/datetime_range/datetime_range.module',
        'basename' => 'datetime_range.module',
        'name' => 'Datetime Range',
        'info' => 
        array (
          'name' => 'Datetime Range',
          'type' => 'module',
          'description' => 'Provides the ability to store end dates.',
          'package' => 'Core (Experimental)',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'datetime',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'dblog' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/dblog/dblog.module',
        'basename' => 'dblog.module',
        'name' => 'Database Logging',
        'info' => 
        array (
          'name' => 'Database Logging',
          'type' => 'module',
          'description' => 'Logs and records system events to the database.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'system.logging_settings',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'quickedit_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/quickedit/tests/modules/quickedit_test.module',
        'basename' => 'quickedit_test.module',
        'name' => 'Quick Edit test',
        'info' => 
        array (
          'name' => 'Quick Edit test',
          'type' => 'module',
          'description' => 'Support module for the Quick Edit module tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'quickedit' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/quickedit/quickedit.module',
        'basename' => 'quickedit.module',
        'name' => 'Quick Edit',
        'info' => 
        array (
          'name' => 'Quick Edit',
          'type' => 'module',
          'description' => 'In-place content editing.',
          'package' => 'Core',
          'core' => '8.x',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'contextual',
            1 => 'field',
            2 => 'filter',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'dynamic_page_cache' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/dynamic_page_cache/dynamic_page_cache.module',
        'basename' => 'dynamic_page_cache.module',
        'name' => 'Internal Dynamic Page Cache',
        'info' => 
        array (
          'name' => 'Internal Dynamic Page Cache',
          'type' => 'module',
          'description' => 'Caches pages for any user, handling dynamic content correctly.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'config_test_rest' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rest/tests/modules/config_test_rest/config_test_rest.module',
        'basename' => 'config_test_rest.module',
        'name' => 'Configuration test REST',
        'info' => 
        array (
          'name' => 'Configuration test REST',
          'type' => 'module',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'config_test',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'rest_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rest/tests/modules/rest_test/rest_test.module',
        'basename' => 'rest_test.module',
        'name' => 'REST test',
        'info' => 
        array (
          'name' => 'REST test',
          'type' => 'module',
          'description' => 'Provides test hooks and resources for REST module.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'rest',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'rest_test_views' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rest/tests/modules/rest_test_views/rest_test_views.module',
        'basename' => 'rest_test_views.module',
        'name' => 'REST test views',
        'info' => 
        array (
          'name' => 'REST test views',
          'type' => 'module',
          'description' => 'Provides default views for views REST tests.',
          'package' => 'Testing',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'rest',
            1 => 'views',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'rest' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/rest/rest.module',
        'basename' => 'rest.module',
        'name' => 'RESTful Web Services',
        'info' => 
        array (
          'name' => 'RESTful Web Services',
          'type' => 'module',
          'description' => 'Exposes entities and other resources as RESTful web API',
          'package' => 'Web services',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'serialization',
          ),
        ),
        'schema_version' => '8203',
        'version' => '8.2.6',
      ),
      'breakpoint' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/breakpoint/breakpoint.module',
        'basename' => 'breakpoint.module',
        'name' => 'Breakpoint',
        'info' => 
        array (
          'name' => 'Breakpoint',
          'type' => 'module',
          'description' => 'Manage breakpoints and breakpoint groups for responsive designs.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'basic_auth' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/basic_auth/basic_auth.module',
        'basename' => 'basic_auth.module',
        'name' => 'HTTP Basic Authentication',
        'info' => 
        array (
          'name' => 'HTTP Basic Authentication',
          'type' => 'module',
          'description' => 'Provides the HTTP Basic authentication provider',
          'package' => 'Web services',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'user',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'ckeditor_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/ckeditor/tests/modules/ckeditor_test.module',
        'basename' => 'ckeditor_test.module',
        'name' => 'CKEditor test',
        'info' => 
        array (
          'name' => 'CKEditor test',
          'type' => 'module',
          'description' => 'Support module for the CKEditor module tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'ckeditor' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/ckeditor/ckeditor.module',
        'basename' => 'ckeditor.module',
        'name' => 'CKEditor',
        'info' => 
        array (
          'name' => 'CKEditor',
          'type' => 'module',
          'description' => 'WYSIWYG editing for rich text fields using CKEditor.',
          'package' => 'Core',
          'core' => '8.x',
          'version' => 'VERSION',
          'dependencies' => 
          array (
            0 => 'editor',
          ),
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'inline_form_errors' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/inline_form_errors/inline_form_errors.module',
        'basename' => 'inline_form_errors.module',
        'name' => 'Inline Form Errors',
        'info' => 
        array (
          'type' => 'module',
          'name' => 'Inline Form Errors',
          'description' => 'Adds WCAG 2.0 accessibility compliance for web form errors, but some functionality might not work.',
          'version' => 'VERSION',
          'core' => '8.x',
          'package' => 'Core (Experimental)',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'contextual' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/contextual/contextual.module',
        'basename' => 'contextual.module',
        'name' => 'Contextual Links',
        'info' => 
        array (
          'name' => 'Contextual Links',
          'type' => 'module',
          'description' => 'Provides contextual links to perform actions related to elements on a page.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'language_test' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/language/tests/language_test/language_test.module',
        'basename' => 'language_test.module',
        'name' => 'Language test',
        'info' => 
        array (
          'name' => 'Language test',
          'type' => 'module',
          'description' => 'Support module for the language layer tests.',
          'core' => '8.x',
          'package' => 'Testing',
          'version' => 'VERSION',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
      'language' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/language/language.module',
        'basename' => 'language.module',
        'name' => 'Language',
        'info' => 
        array (
          'name' => 'Language',
          'type' => 'module',
          'description' => 'Allows users to configure languages and apply them to content.',
          'package' => 'Multilingual',
          'version' => 'VERSION',
          'core' => '8.x',
          'configure' => 'entity.configurable_language.collection',
        ),
        'schema_version' => '8001',
        'version' => '8.2.6',
      ),
      'color' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/modules/color/color.module',
        'basename' => 'color.module',
        'name' => 'Color',
        'info' => 
        array (
          'name' => 'Color',
          'type' => 'module',
          'description' => 'Allows administrators to change the color scheme of compatible themes.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
        ),
        'schema_version' => 0,
        'version' => '8.2.6',
      ),
    ),
    'themes' => 
    array (
      'gravity.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/themes/custom/gravity/gravity.info.yml',
        'basename' => 'gravity.info.yml',
        'name' => 'Gravity',
        'info' => 
        array (
          'name' => 'Gravity',
          'type' => 'theme',
          'description' => 'A custom theme that uses Pattern Lab v2 and component design',
          'base theme' => 'stable',
          'core' => '8.x',
          'libraries' => 
          array (
            0 => 'gravity/global',
          ),
          'ckeditor_stylesheets' => 
          array (
            0 => 'dist/style.css',
          ),
          'regions' => 
          array (
            'header' => 'Header',
            'hero' => 'Hero',
            'highlight' => 'Highlight',
            'search_menu' => 'Search and Main Menu',
            'content' => 'Content',
            'sidebar' => 'Sidebar',
            'feature' => 'Feature',
            'social_media' => 'Social Media',
            'footer' => 'Footer',
          ),
          'component-libraries' => 
          array (
            'base' => 
            array (
              'paths' => 
              array (
                0 => 'components/_patterns/00-base',
              ),
            ),
            'atoms' => 
            array (
              'paths' => 
              array (
                0 => 'components/_patterns/01-atoms',
              ),
            ),
            'molecules' => 
            array (
              'paths' => 
              array (
                0 => 'components/_patterns/02-molecules',
              ),
            ),
            'organisms' => 
            array (
              'paths' => 
              array (
                0 => 'components/_patterns/03-organisms',
              ),
            ),
            'templates' => 
            array (
              'paths' => 
              array (
                0 => 'components/_patterns/04-templates',
              ),
            ),
            'pages' => 
            array (
              'paths' => 
              array (
                0 => 'components/_patterns/05-pages',
              ),
            ),
          ),
        ),
      ),
      'stark.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/themes/stark/stark.info.yml',
        'basename' => 'stark.info.yml',
        'name' => 'Stark',
        'info' => 
        array (
          'name' => 'Stark',
          'type' => 'theme',
          'description' => 'An intentionally plain theme with no styling to demonstrate default Drupal’s HTML and CSS. Learn how to build a custom theme from Stark in the <a href="https://www.drupal.org/theme-guide">Theming Guide</a>.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'base theme' => false,
        ),
        'version' => '8.2.6',
      ),
      'bartik.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/themes/bartik/bartik.info.yml',
        'basename' => 'bartik.info.yml',
        'name' => 'Bartik',
        'info' => 
        array (
          'name' => 'Bartik',
          'type' => 'theme',
          'base theme' => 'classy',
          'description' => 'A flexible, recolorable theme with many regions and a responsive, mobile-first layout.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'libraries' => 
          array (
            0 => 'bartik/global-styling',
          ),
          'ckeditor_stylesheets' => 
          array (
            0 => 'css/base/elements.css',
            1 => 'css/components/captions.css',
            2 => 'css/components/table.css',
            3 => 'css/components/text-formatted.css',
          ),
          'regions' => 
          array (
            'header' => 'Header',
            'primary_menu' => 'Primary menu',
            'secondary_menu' => 'Secondary menu',
            'page_top' => 'Page top',
            'page_bottom' => 'Page bottom',
            'highlighted' => 'Highlighted',
            'featured_top' => 'Featured top',
            'breadcrumb' => 'Breadcrumb',
            'content' => 'Content',
            'sidebar_first' => 'Sidebar first',
            'sidebar_second' => 'Sidebar second',
            'featured_bottom_first' => 'Featured bottom first',
            'featured_bottom_second' => 'Featured bottom second',
            'featured_bottom_third' => 'Featured bottom third',
            'footer_first' => 'Footer first',
            'footer_second' => 'Footer second',
            'footer_third' => 'Footer third',
            'footer_fourth' => 'Footer fourth',
            'footer_fifth' => 'Footer fifth',
          ),
        ),
        'version' => '8.2.6',
      ),
      'classy.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/themes/classy/classy.info.yml',
        'basename' => 'classy.info.yml',
        'name' => 'Classy',
        'info' => 
        array (
          'name' => 'Classy',
          'type' => 'theme',
          'description' => 'A base theme with sensible default CSS classes added. Learn how to use Classy as a base theme in the <a href="https://www.drupal.org/theme-guide/8">Drupal 8 Theming Guide</a>.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'hidden' => true,
          'libraries' => 
          array (
            0 => 'classy/base',
            1 => 'core/normalize',
          ),
          'libraries-extend' => 
          array (
            'user/drupal.user' => 
            array (
              0 => 'classy/user',
            ),
            'core/drupal.dropbutton' => 
            array (
              0 => 'classy/dropbutton',
            ),
            'core/drupal.dialog' => 
            array (
              0 => 'classy/dialog',
            ),
            'file/drupal.file' => 
            array (
              0 => 'classy/file',
            ),
            'core/drupal.progress' => 
            array (
              0 => 'classy/progress',
            ),
          ),
        ),
        'version' => '8.2.6',
      ),
      'stable.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/themes/stable/stable.info.yml',
        'basename' => 'stable.info.yml',
        'name' => 'Stable',
        'info' => 
        array (
          'name' => 'Stable',
          'type' => 'theme',
          'description' => 'A default base theme using Drupal 8.0.0\'s core markup and CSS.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'base theme' => false,
          'hidden' => true,
          'libraries-override' => 
          array (
            'block/drupal.block.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/block.admin.css' => 'css/block/block.admin.css',
                ),
              ),
            ),
            'ckeditor/drupal.ckeditor' => 
            array (
              'css' => 
              array (
                'state' => 
                array (
                  'css/ckeditor.css' => 'css/ckeditor/ckeditor.css',
                ),
              ),
            ),
            'ckeditor/drupal.ckeditor.plugins.drupalimagecaption' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/plugins/drupalimagecaption/ckeditor.drupalimagecaption.css' => 'css/ckeditor/plugins/drupalimagecaption/ckeditor.drupalimagecaption.css',
                ),
              ),
            ),
            'ckeditor/drupal.ckeditor.plugins.language' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/plugins/language/ckeditor.language.css' => 'css/ckeditor/plugins/language/ckeditor.language.css',
                ),
              ),
            ),
            'ckeditor/drupal.ckeditor.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/ckeditor.admin.css' => 'css/ckeditor/ckeditor.admin.css',
                ),
              ),
            ),
            'color/admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/color.admin.css' => 'css/color/color.admin.css',
                ),
              ),
            ),
            'config_translation/drupal.config_translation.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/config_translation.admin.css' => 'css/config_translation/config_translation.admin.css',
                ),
              ),
            ),
            'content_translation/drupal.content_translation.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/content_translation.admin.css' => 'css/content_translation/content_translation.admin.css',
                ),
              ),
            ),
            'contextual/drupal.contextual-links' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/contextual.module.css' => 'css/contextual/contextual.module.css',
                ),
                'theme' => 
                array (
                  'css/contextual.theme.css' => 'css/contextual/contextual.theme.css',
                  'css/contextual.icons.theme.css' => 'css/contextual/contextual.icons.theme.css',
                ),
              ),
            ),
            'contextual/drupal.contextual-toolbar' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/contextual.toolbar.css' => 'css/contextual/contextual.toolbar.css',
                ),
              ),
            ),
            'core/drupal.dropbutton' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'misc/dropbutton/dropbutton.css' => 'css/core/dropbutton/dropbutton.css',
                ),
              ),
            ),
            'core/drupal.vertical-tabs' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'misc/vertical-tabs.css' => 'css/core/vertical-tabs.css',
                ),
              ),
            ),
            'dblog/drupal.dblog' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/dblog.module.css' => 'css/dblog/dblog.module.css',
                ),
              ),
            ),
            'field_ui/drupal.field_ui' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/field_ui.admin.css' => 'css/field_ui/field_ui.admin.css',
                ),
              ),
            ),
            'file/drupal.file' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/file.admin.css' => 'css/file/file.admin.css',
                ),
              ),
            ),
            'filter/drupal.filter.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/filter.admin.css' => 'css/filter/filter.admin.css',
                ),
              ),
            ),
            'filter/drupal.filter' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/filter.admin.css' => 'css/filter/filter.admin.css',
                ),
              ),
            ),
            'filter/caption' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/filter.caption.css' => 'css/filter/filter.caption.css',
                ),
              ),
            ),
            'image/admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/image.admin.css' => 'css/image/image.admin.css',
                ),
              ),
            ),
            'language/drupal.language.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/language.admin.css' => 'css/language/language.admin.css',
                ),
              ),
            ),
            'locale/drupal.locale.admin' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/locale.admin.css' => 'css/locale/locale.admin.css',
                ),
              ),
            ),
            'menu_ui/drupal.menu_ui.adminforms' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/menu_ui.admin.css' => 'css/menu_ui/menu_ui.admin.css',
                ),
              ),
            ),
            'node/drupal.node' => 
            array (
              'css' => 
              array (
                'layout' => 
                array (
                  'css/node.module.css' => 'css/node/node.module.css',
                ),
              ),
            ),
            'node/drupal.node.preview' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/node.preview.css' => 'css/node/node.preview.css',
                ),
              ),
            ),
            'node/form' => 
            array (
              'css' => 
              array (
                'layout' => 
                array (
                  'css/node.module.css' => 'css/node/node.module.css',
                ),
              ),
            ),
            'node/drupal.node.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/node.admin.css' => 'css/node/node.admin.css',
                ),
              ),
            ),
            'quickedit/quickedit' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/quickedit.module.css' => 'css/quickedit/quickedit.module.css',
                ),
                'theme' => 
                array (
                  'css/quickedit.theme.css' => 'css/quickedit/quickedit.theme.css',
                  'css/quickedit.icons.theme.css' => 'css/quickedit/quickedit.icons.theme.css',
                ),
              ),
            ),
            'shortcut/drupal.shortcut' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/shortcut.theme.css' => 'css/shortcut/shortcut.theme.css',
                  'css/shortcut.icons.theme.css' => 'css/shortcut/shortcut.icons.theme.css',
                ),
              ),
            ),
            'simpletest/drupal.simpletest' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/simpletest.module.css' => 'css/simpletest/simpletest.module.css',
                ),
              ),
            ),
            'system/base' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/components/ajax-progress.module.css' => 'css/system/components/ajax-progress.module.css',
                  'css/components/align.module.css' => 'css/system/components/align.module.css',
                  'css/components/autocomplete-loading.module.css' => 'css/system/components/autocomplete-loading.module.css',
                  'css/components/fieldgroup.module.css' => 'css/system/components/fieldgroup.module.css',
                  'css/components/container-inline.module.css' => 'css/system/components/container-inline.module.css',
                  'css/components/clearfix.module.css' => 'css/system/components/clearfix.module.css',
                  'css/components/details.module.css' => 'css/system/components/details.module.css',
                  'css/components/hidden.module.css' => 'css/system/components/hidden.module.css',
                  'css/components/item-list.module.css' => 'css/system/components/item-list.module.css',
                  'css/components/js.module.css' => 'css/system/components/js.module.css',
                  'css/components/nowrap.module.css' => 'css/system/components/nowrap.module.css',
                  'css/components/position-container.module.css' => 'css/system/components/position-container.module.css',
                  'css/components/progress.module.css' => 'css/system/components/progress.module.css',
                  'css/components/reset-appearance.module.css' => 'css/system/components/reset-appearance.module.css',
                  'css/components/resize.module.css' => 'css/system/components/resize.module.css',
                  'css/components/sticky-header.module.css' => 'css/system/components/sticky-header.module.css',
                  'css/components/tabledrag.module.css' => 'css/system/components/tabledrag.module.css',
                  'css/components/tablesort.module.css' => 'css/system/components/tablesort.module.css',
                  'css/components/tree-child.module.css' => 'css/system/components/tree-child.module.css',
                ),
              ),
            ),
            'system/admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/system.admin.css' => 'css/system/system.admin.css',
                ),
              ),
            ),
            'system/maintenance' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/system.maintenance.css' => 'css/system/system.maintenance.css',
                ),
              ),
            ),
            'system/diff' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/system.diff.css' => 'css/system/system.diff.css',
                ),
              ),
            ),
            'taxonomy/drupal.taxonomy' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/taxonomy.theme.css' => 'css/taxonomy/taxonomy.theme.css',
                ),
              ),
            ),
            'toolbar/toolbar' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/toolbar.module.css' => 'css/toolbar/toolbar.module.css',
                ),
                'theme' => 
                array (
                  'css/toolbar.theme.css' => 'css/toolbar/toolbar.theme.css',
                  'css/toolbar.icons.theme.css' => 'css/toolbar/toolbar.icons.theme.css',
                ),
              ),
            ),
            'toolbar/toolbar.menu' => 
            array (
              'css' => 
              array (
                'state' => 
                array (
                  'css/toolbar.menu.css' => 'css/toolbar/toolbar.menu.css',
                ),
              ),
            ),
            'tour/tour-styling' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/tour.module.css' => 'css/tour/tour.module.css',
                ),
              ),
            ),
            'update/drupal.update.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/update.admin.theme.css' => 'css/update/update.admin.theme.css',
                ),
              ),
            ),
            'user/drupal.user' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/user.module.css' => 'css/user/user.module.css',
                ),
              ),
            ),
            'user/drupal.user.admin' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/user.admin.css' => 'css/user/user.admin.css',
                ),
              ),
            ),
            'user/drupal.user.icons' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'css/user.icons.admin.css' => 'css/user/user.icons.admin.css',
                ),
              ),
            ),
            'views/views.module' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/views.module.css' => 'css/views/views.module.css',
                ),
              ),
            ),
            'views_ui/admin.styling' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'css/views_ui.admin.css' => 'css/views_ui/views_ui.admin.css',
                ),
                'theme' => 
                array (
                  'css/views_ui.admin.theme.css' => 'css/views_ui/views_ui.admin.theme.css',
                  'css/views_ui.contextual.css' => 'css/views_ui/views_ui.contextual.css',
                ),
              ),
            ),
          ),
        ),
        'version' => '8.2.6',
      ),
      'seven.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/themes/seven/seven.info.yml',
        'basename' => 'seven.info.yml',
        'name' => 'Seven',
        'info' => 
        array (
          'name' => 'Seven',
          'type' => 'theme',
          'base theme' => 'classy',
          'description' => 'The default administration theme for Drupal 8 was designed with clean lines, simple blocks, and sans-serif font to emphasize the tools and tasks at hand.',
          'alt text' => 'Default administration theme for Drupal 8 with simple blocks and clean lines.',
          'package' => 'Core',
          'version' => 'VERSION',
          'core' => '8.x',
          'libraries' => 
          array (
            0 => 'seven/global-styling',
          ),
          'libraries-override' => 
          array (
            'core/drupal.vertical-tabs' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'misc/vertical-tabs.css' => false,
                ),
              ),
            ),
            'core/jquery.ui' => 
            array (
              'css' => 
              array (
                'theme' => 
                array (
                  'assets/vendor/jquery.ui/themes/base/theme.css' => false,
                ),
              ),
            ),
            'core/jquery.ui.dialog' => 
            array (
              'css' => 
              array (
                'component' => 
                array (
                  'assets/vendor/jquery.ui/themes/base/dialog.css' => false,
                ),
              ),
            ),
            'classy/dialog' => 'seven/seven.drupal.dialog',
          ),
          'libraries-extend' => 
          array (
            'core/ckeditor' => 
            array (
              0 => 'seven/ckeditor-dialog',
            ),
            'core/drupal.vertical-tabs' => 
            array (
              0 => 'seven/vertical-tabs',
            ),
            'core/jquery.ui' => 
            array (
              0 => 'seven/seven.jquery.ui',
            ),
            'tour/tour-styling' => 
            array (
              0 => 'seven/tour-styling',
            ),
          ),
          'quickedit_stylesheets' => 
          array (
            0 => 'css/components/quickedit.css',
          ),
          'regions' => 
          array (
            'header' => 'Header',
            'pre_content' => 'Pre-content',
            'breadcrumb' => 'Breadcrumb',
            'highlighted' => 'Highlighted',
            'help' => 'Help',
            'content' => 'Content',
            'page_top' => 'Page top',
            'page_bottom' => 'Page bottom',
            'sidebar_first' => 'First sidebar',
          ),
          'regions_hidden' => 
          array (
            0 => 'sidebar_first',
          ),
        ),
        'version' => '8.2.6',
      ),
      'twig.info' => 
      array (
        'filename' => '/data/disk/o1/static/hike_8-2-5_2017-02-10/core/themes/engines/twig/twig.info.yml',
        'basename' => 'twig.info.yml',
        'name' => 'Twig',
        'info' => 
        array (
          'type' => 'theme_engine',
          'name' => 'Twig',
          'core' => '8.x',
          'version' => 'VERSION',
          'package' => 'Core',
        ),
        'version' => '8.2.6',
      ),
    ),
    'platforms' => 
    array (
      'drupal' => 
      array (
        'short_name' => 'drupal',
        'version' => '8.2.6',
        'description' => 'This platform is running Drupal 8.2.6',
      ),
    ),
    'profiles' => 
    array (
      'standard' => 
      array (
        'name' => 'Standard',
        'info' => 
        array (
          'name' => 'Standard',
          'type' => 'profile',
          'description' => 'Install with commonly used features pre-configured.',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'node',
            1 => 'history',
            2 => 'block',
            3 => 'breakpoint',
            4 => 'ckeditor',
            5 => 'color',
            6 => 'config',
            7 => 'comment',
            8 => 'contextual',
            9 => 'contact',
            10 => 'menu_link_content',
            11 => 'datetime',
            12 => 'block_content',
            13 => 'quickedit',
            14 => 'editor',
            15 => 'help',
            16 => 'image',
            17 => 'menu_ui',
            18 => 'options',
            19 => 'path',
            20 => 'page_cache',
            21 => 'dynamic_page_cache',
            22 => 'taxonomy',
            23 => 'dblog',
            24 => 'search',
            25 => 'shortcut',
            26 => 'toolbar',
            27 => 'field_ui',
            28 => 'file',
            29 => 'rdf',
            30 => 'views',
            31 => 'views_ui',
            32 => 'tour',
            33 => 'automated_cron',
          ),
          'themes' => 
          array (
            0 => 'bartik',
            1 => 'seven',
          ),
          'languages' => 
          array (
            0 => 'en',
          ),
        ),
        'filename' => './core/profiles/standard/standard.info.yml',
        'version' => '8.2.6',
      ),
      'minimal' => 
      array (
        'name' => 'Minimal',
        'info' => 
        array (
          'name' => 'Minimal',
          'type' => 'profile',
          'description' => 'Build a custom site without pre-configured functionality. Suitable for advanced users.',
          'version' => 'VERSION',
          'core' => '8.x',
          'dependencies' => 
          array (
            0 => 'node',
            1 => 'block',
            2 => 'dblog',
            3 => 'page_cache',
            4 => 'dynamic_page_cache',
          ),
          'themes' => 
          array (
            0 => 'stark',
          ),
          'languages' => 
          array (
            0 => 'en',
          ),
        ),
        'filename' => './core/profiles/minimal/minimal.info.yml',
        'version' => '8.2.6',
      ),
    ),
  ),
  'sites-all' => 
  array (
    'modules' => 
    array (
    ),
    'themes' => 
    array (
    ),
  ),
  'profiles' => 
  array (
    'standard' => 
    array (
      'modules' => 
      array (
      ),
      'themes' => 
      array (
      ),
    ),
    'minimal' => 
    array (
      'modules' => 
      array (
      ),
      'themes' => 
      array (
      ),
    ),
  ),
);