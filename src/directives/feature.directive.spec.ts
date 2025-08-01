import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FeatureConfigState } from '../store/feature-config.state';
import { FeatureDirective } from './feature.directive';

describe('FeatureDirective', () => {
  let store: Store;
  let templateRef: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainer: jasmine.SpyObj<ViewContainerRef>;

  beforeEach(() => {
    const templateSpy = jasmine.createSpyObj('TemplateRef', ['createEmbeddedView']);
    const viewContainerSpy = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FeatureConfigState])],
      providers: [
        { provide: TemplateRef, useValue: templateSpy },
        { provide: ViewContainerRef, useValue: viewContainerSpy }
      ]
    });

    store = TestBed.inject(Store);
    templateRef = TestBed.inject(TemplateRef) as jasmine.SpyObj<TemplateRef<any>>;
    viewContainer = TestBed.inject(ViewContainerRef) as jasmine.SpyObj<ViewContainerRef>;
  });

  it('should create an instance', () => {
    const directive = new FeatureDirective(templateRef, viewContainer, store);
    expect(directive).toBeTruthy();
  });
});
