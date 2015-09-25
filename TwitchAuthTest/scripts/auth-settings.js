var gWidgetSettings = {
	showImage: true,
	showDisplayName: true,
	showEmail: true
};

var gAppInfo = null;

function settings_ui_update_controls()
{
	if (gWidgetSettings != null)
	{
		$('#show_image').prop('checked', gWidgetSettings.showImage);
		$('#show_display_name').prop('checked', gWidgetSettings.showDisplayName);
		$('#show_email').prop('checked', gWidgetSettings.showEmail);
	}

	if (gAppInfo != null && gAppInfo.oauth_access_token != null)
	{
		document.getElementById("access_token").innerText = gAppInfo.oauth_access_token;
		document.getElementById("channel_name").innerText = gAppInfo.twitch_channel_name;
	}
	else
	{
		document.getElementById("access_token").innerText = "UNAUTHENTICATED";
		document.getElementById("channel_name").innerText = "UNKNOWN";
	}
}

function save_settings()
{
	gWidgetSettings.showImage = $('#show_image').is(":checked");
	gWidgetSettings.showDisplayName = $('#show_display_name').is(":checked");
	gWidgetSettings.showEmail = $('#show_email').is(":checked");
}

function push_settings_to_renderer()
{
	if (window.hostApp)
	{
		gWidgetSettings._runtime = {
			geometry: {
				width: document.documentElement.scrollWidth,
				height: document.documentElement.scrollHeight
			}
		};

		window.hostApp.execute('apply_widget_settings', JSON.stringify(gWidgetSettings));
	}
}

// Call this to push setting changes to the host app *Gameshow* so it would
// update the rendering component with latest configuration parameters
function SaveSettingsAndNotifyHostApp()
{
	save_settings();
	push_settings_to_renderer();
}

// This will be called by the host app *Gameshow* to restore setting values.
// appInfo may include oauth_access_token and twitch_channel_name, if the host
// app *Gameshow* was authorized by the user to access Twitch.
function SetWidgetSettings(widgetSettings, appInfo)
{
	if (widgetSettings != null)
	{
		gWidgetSettings = widgetSettings;
	}

	if (appInfo != null)
	{
		gAppInfo = appInfo;
	}

	settings_ui_update_controls();
	push_settings_to_renderer();
}