<?php

namespace Drupal\gravity_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'FooterBlock' block.
 *
 * @Block(
 *  id = "footer_block",
 *  admin_label = @Translation("Footer block"),
 * )
 */
class FooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    // Set the year.
    $current_year = '';
    if (date('Y') > '2017') {
      $current_year = '- ' . date('Y');
    }

    // Provide the logo.
    $footer_logo = '<img src="/themes/custom/gravity/images/footer_logo.svg"
    alt="Hike with Graivity">';

    // Build the copyright.
    $footer_copyright = 'Copyright 2017 ' . $current_year . ' by Jim Smith';

    // Make the footer content.
    $build = [];
    $build['footer_block']['#markup'] = '<div class="site-footer__image">' .
      $footer_logo . '</div>';
    $build['footer_block']['#markup'] .= '<p class="site-footer__copyright">' .
      $footer_copyright . '</p>';
    $build['footer_block']['#markup'] .= '<p class="site-footer__copyright">
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
      <img alt="Creative Commons License" style="border-width:0" 
      src="/themes/custom/gravity/images/creative_commons.svg" /></a><br />
      This work is licensed under a <a rel="license" 
      href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons 
      Attribution-NonCommercial 4.0 International License</a>.</p>';
    $build['footer_block']['#markup'] .= '<p class="site-footer__copyright">This 
      site was built in <a href="https://drupal.org">Drupal</a> by <a 
      href="https://www.startinggravity.com">Starting Gravity</a>.</p>';

    return $build;
  }

}
