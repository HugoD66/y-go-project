import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BarService } from '../../../services/bar.service';
import { PictureListService } from '../../../services/picture-list.service';
import { BarModel, ParticularityEnum } from '../../../models/bar.model';
import { config, Map } from '@maptiler/sdk';
import { GeocodingService } from '../../../services/geocoding.service';
import { MapService } from '../../../services/map.service';
import { PictureListModel } from '../../../models/picture-list.model';
import { SnackbarService } from '../../../components/snackbar/snackbar.component';

@Component({
  selector: `app-add-bars`,
  templateUrl: `./add-bar.component.html`,
  styleUrls: [`./add-bar.component.scss`],
})
export class AddBarComponent implements OnInit, AfterViewInit {
  barForm: FormGroup;
  map: Map | undefined;
  particularitiesArray: any[] = [];

  @ViewChild(`map`)
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    private fb: FormBuilder,
    private barService: BarService,
    private pictureListService: PictureListService,
    private geocodingService: GeocodingService,
    private mapService: MapService,
    private snackbarService: SnackbarService,
  ) {
    this.particularitiesArray = Object.keys(ParticularityEnum).map((key) => ({
      key,
      label: ParticularityEnum[key as keyof typeof ParticularityEnum],
    }));

    this.barForm = this.fb.group({
      name: [
        ``,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
        ],
      ],
      adresse: [``, Validators.required],
      description: [
        ``,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(15),
        ],
      ],
      telephone: [``, [Validators.pattern(`^((\\+91-?)|0)?[0-9]{10}$`)]],
      pictureOne: [null, Validators.required],
      pictureTwo: [null],
      pictureThree: [null],
      pictureFour: [null],

      ...this.particularitiesArray.reduce((controls, particularity) => {
        controls[particularity.key] = [false];
        return controls;
      }, {}),
    });
  }

  ngOnInit(): void {
    config.apiKey = `1bYmKrc8pg0FSu8GXalV`;
    this.mapService.addressSelected.subscribe((address) => {
      this.barForm.patchValue({ adresse: address });
    });
    this.subscribeToParticularityChanges();
  }

  ngAfterViewInit() {
    this.mapService.initializeMap(this.mapContainer.nativeElement);
    this.map = this.mapService.getMap();
    this.mapService.addMarkerOnClic();
  }

  onFileChange(event: any, pictureId?: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.barForm.patchValue({
          [pictureId as string]: reader.result as string,
        });
      };
    }
  }
  onParticularityChange(event: any, particularityKey: string) {
    const isChecked = event.checked;
    this.barForm.get(particularityKey)?.setValue(isChecked);
  }
  onSubmit() {
    if (this.barForm.valid) {
      const barData = this.prepareBarData();

      barData.particularities = this.particularitiesArray
        .filter((particularity) => this.barForm.get(particularity.key)?.value)
        .map((particularity) => particularity.key);

      console.log(barData);
      this.barService.addBar(barData).subscribe({
        next: (barResponse: BarModel) => {
          console.log(`Bar enregistré:`, barResponse);
          this.snackbarService.openSnackBar(
            `Le bar ${barResponse.name} a bien été enregistré`,
            `Fermer`,
          );
        },
        error: (error) => {
          console.error(`Erreur lors de l'enregistrement du bar:`, error);
          this.barForm.setErrors({
            submit:
              error.error.message ||
              `Une erreur s'est produite lors de l'enregistrement du bar.`,
          });
        },
      });
    }
  }

  onAddressChange(): void {
    if (this.barForm.value.adresse.length > 5) {
      this.geocodingService
        .getCoordinates(this.barForm.value.adresse)
        .subscribe((data) => {
          console.log(data);
          this.mapService.setMarkerByCoordinates(data.x, data.y);
        });
    }
  }
  prepareBarData(): any {
    const formData = this.barForm.value;
    const markerCoordinates = this.mapService.getMarkerCoordinates();
    if (markerCoordinates) {
      formData.geo = markerCoordinates;
    }
    formData.pictureList = {
      pictureOne: formData.pictureOne,
      pictureTwo: formData.pictureTwo,
      pictureThree: formData.pictureThree,
      pictureFour: formData.pictureFour,
    };
    delete formData.pictureOne;
    delete formData.pictureTwo;
    delete formData.pictureThree;
    delete formData.pictureFour;

    return formData;
  }

  private subscribeToParticularityChanges() {
    this.particularitiesArray.forEach((particularity) => {
      this.barForm.get(particularity.key)?.valueChanges.subscribe((value) => {
        console.log(particularity.key, value);
        // Autres actions en fonction de la valeur
      });
    });
  }
}
