import { NgModule } from "@angular/core";
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatButtonModule, MatToolbarModule,
    MatIconModule,
    MatCardModule, MatCheckboxModule, MatSidenavModule, MatListModule,  MatFormFieldModule , MatInputModule ,  MatProgressBarModule ,
     MatProgressSpinnerModule, MatDividerModule, MatSlideToggleModule, MatSelectModule, MatOptionModule , MatRadioModule, MatExpansionModule, MatMenuModule, MatDialogModule, MatTabsModule, MatSnackBarModule
} from "@angular/material";

@NgModule({
    imports: [
        MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule , MatProgressBarModule , MatProgressSpinnerModule , MatToolbarModule,  MatIconModule,
        MatCardModule , LayoutModule, MatToolbarModule, MatDividerModule, MatSlideToggleModule,MatSelectModule,MatOptionModule,MatRadioModule , MatExpansionModule,  
        MatButtonModule, MatMenuModule , MatDialogModule , MatProgressSpinnerModule, MatTabsModule, MatSnackBarModule,
    
        MatSidenavModule,
    
        MatIconModule,
    
        MatListModule
    ],
    exports: [
        MatButtonModule, MatCheckboxModule, MatInputModule  , MatFormFieldModule  , MatProgressBarModule , MatProgressSpinnerModule, MatDividerModule,
        MatToolbarModule,MatSlideToggleModule,MatSelectModule, MatOptionModule , MatRadioModule , MatExpansionModule,
        MatIconModule, MatMenuModule , MatDialogModule , MatProgressSpinnerModule , MatTabsModule, MatSnackBarModule , 
        MatCardModule,
        MatToolbarModule,
    
        MatButtonModule,
    
        MatSidenavModule,
    
        MatIconModule,
    
        MatListModule
    ]
})

export class MaterialModule {

}