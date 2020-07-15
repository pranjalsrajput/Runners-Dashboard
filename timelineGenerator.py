import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.dates as mdates
from datetime import datetime

dates = ["5k",
         "10k",
         "15k",
         "20k",
         "25k",
         "Half",
         "30k",
         "35k",
         "40k",
         "Finish"]

names = ["00:14:52", "00:29:48", "00:44:30", "00:59:21", "01:14:15", "01:02:38", "01:29:16", "01:44:36",
         "01:59:55", "02:06:39"]

# Convert date strings (e.g. 2014-10-18) to datetime
# dates = [datetime.strptime(d, "%Y-%m-%d") for d in dates]

# Choose some nice levels
levels = np.tile([-5, 5, -3, 3, -1, 1],
                 int(np.ceil(len(dates) / 6)))[:len(dates)]

# Create figure and plot a stem plot with the date
fig, ax = plt.subplots(figsize=(8.8, 4), constrained_layout=True)
ax.set(title=f"Timeline for runner {2}")

# Give x axis label for the stem plot

ax.set_xlabel('Distance (in meters)')

markerline, stemline, baseline = ax.stem(dates, levels,
                                         linefmt="-.", basefmt="k-",
                                         use_line_collection=True)

plt.setp(markerline, mec="k", mfc="w", zorder=3)

# Shift the markers to the baseline by replacing the y-data by zeros.
# markerline.set_ydata(np.zeros(len(dates)))

# annotate lines
vert = np.array(['top', 'bottom'])[(levels > 0).astype(int)]
for d, l, r, va in zip(dates, levels, names, vert):
    ax.annotate(r, xy=(d, l), xytext=(-3, np.sign(l) * 3),
                textcoords="offset points", va=va, ha="right", rotation=0)

# format xaxis with 4 month intervals
# ax.get_xaxis().set_major_locator(mdates.MonthLocator(interval=4))
# ax.get_xaxis().set_major_formatter(mdates.DateFormatter("%b %Y"))
plt.setp(ax.get_xticklabels(), rotation=30, ha="right")

# remove y axis and spines
ax.get_yaxis().set_visible(False)
for spine in ["left", "top", "right"]:
    ax.spines[spine].set_visible(False)

ax.margins(y=0.1)
plt.show()
