package com.locateone;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNAndroidLocationEnablerPackage(),
          new LocationServicesDialogBoxPackage(),
          new VectorIconsPackage(),
          new RNGooglePlacesPackage(),
          new SplashScreenReactPackage(),
          new MapsPackage(),
          new ReactNativePermissionsPackage(),
          new FIRMessagingPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
