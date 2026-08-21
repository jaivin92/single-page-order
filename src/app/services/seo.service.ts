import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  private readonly defaultSeo: SeoConfig = {
    title: 'Restaurant POS Billing Software | Single Page Order',
    description: 'Fast Angular POS billing screen for restaurants, cafes, cloud kitchens, and hotel food counters with catalog, order panel, tax, receipt, and print flow.',
    keywords: 'restaurant POS, cafe POS, hotel POS, food billing software, Angular POS, KOT billing, receipt print',
    robots: 'index, follow',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Single Page Order POS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Restaurant and hospitality POS billing application for fast order entry and receipt printing.'
    }
  };

  init(): void {
    this.update(this.defaultSeo);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.getDeepestRoute(this.activatedRoute)),
        map(route => route.snapshot.data['seo'] as SeoConfig | undefined)
      )
      .subscribe(seo => {
        this.update(seo ?? this.defaultSeo);
      });
  }

  update(seo: SeoConfig): void {
    const mergedSeo = {
      ...this.defaultSeo,
      ...seo
    };

    const canonicalUrl =
      mergedSeo.canonical ??
      this.buildCanonicalUrl(this.router.url);

    this.title.setTitle(mergedSeo.title);

    this.updateNameTag('description', mergedSeo.description);
    this.updateNameTag('keywords', mergedSeo.keywords);
    this.updateNameTag('robots', mergedSeo.robots);

    this.updatePropertyTag('og:title', mergedSeo.title);
    this.updatePropertyTag('og:description', mergedSeo.description);
    this.updatePropertyTag('og:type', mergedSeo.type);
    this.updatePropertyTag('og:url', canonicalUrl);
    this.updatePropertyTag('og:image', mergedSeo.image);

    this.updateNameTag('twitter:card', mergedSeo.image ? 'summary_large_image' : 'summary');
    this.updateNameTag('twitter:title', mergedSeo.title);
    this.updateNameTag('twitter:description', mergedSeo.description);
    this.updateNameTag('twitter:image', mergedSeo.image);

    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(mergedSeo.structuredData);
  }

  buildRestaurantSeo(pageTitle: string, description: string, route: string): SeoConfig {
    return {
      title: `${pageTitle} | Restaurant POS`,
      description,
      keywords: 'restaurant POS, cafe billing, food billing software, hotel POS, KOT, receipt printing',
      canonical: this.buildCanonicalUrl(route),
      type: 'website'
    };
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }

  private updateNameTag(name: string, content?: string): void {
    if (!content) {
      this.meta.removeTag(`name='${name}'`);
      return;
    }

    this.meta.updateTag({ name, content });
  }

  private updatePropertyTag(property: string, content?: string): void {
    if (!content) {
      this.meta.removeTag(`property='${property}'`);
      return;
    }

    this.meta.updateTag({ property, content });
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private updateStructuredData(data?: Record<string, unknown>): void {
    const scriptId = 'app-seo-structured-data';
    const existingScript = this.document.getElementById(scriptId);

    if (existingScript) {
      existingScript.remove();
    }

    if (!data) {
      return;
    }

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private buildCanonicalUrl(path: string): string {
    const origin =
      this.document.location?.origin ??
      '';

    return `${origin}${path}`;
  }
}
